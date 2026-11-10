"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CalendarCheck, Clock, DoorOpen, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchInput } from "@/components/shared/search-input";

export type FinderDoctor = {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string | null;
  room: string | null;
  schedule: string | null;
  local: string | null;
  phone: string | null;
  department: { name: string; slug: string };
};

type Department = { slug: string; name: string };

const PAGE_SIZE = 24;

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/**
 * Public doctor directory: instant client-side search by name/specialty and a
 * department filter. Filters are mirrored to the URL so results are shareable.
 */
export function DoctorFinder({
  doctors,
  departments,
  initialQuery,
  initialDepartment,
}: {
  doctors: FinderDoctor[];
  departments: Department[];
  initialQuery: string;
  initialDepartment: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);
  const [department, setDepartment] = useState(initialDepartment || "all");
  // Render results in pages — all ~200 cards at once makes a very large DOM.
  const [limit, setLimit] = useState(PAGE_SIZE);

  function syncUrl(q: string, dept: string) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (dept && dept !== "all") params.set("department", dept);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const results = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    return doctors.filter((d) => {
      if (department !== "all" && d.department.slug !== department) return false;
      if (terms.length === 0) return true;
      const hay = normalize(`${d.firstName} ${d.lastName} ${d.department.name} ${d.specialty ?? ""}`);
      return terms.every((t) => hay.includes(t));
    });
  }, [doctors, query, department]);

  const items = [{ value: "all", label: "All departments" }, ...departments.map((d) => ({ value: d.slug, label: d.name }))];

  return (
    <div className="space-y-6">
      <div role="search" className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="w-full sm:max-w-sm">
          <span className="sr-only">Search doctors by name or specialty</span>
          <SearchInput
            value={query}
            onChange={(v) => {
              setQuery(v);
              setLimit(PAGE_SIZE);
              syncUrl(v, department);
            }}
            placeholder="Search by name or specialty…"
          />
        </label>
        <Select
          items={items}
          value={department}
          onValueChange={(v: string | null) => {
            const next = v ?? "all";
            setDepartment(next);
            setLimit(PAGE_SIZE);
            syncUrl(query, next);
          }}
        >
          <SelectTrigger className="w-full sm:w-64" aria-label="Filter by department">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {items.map((i) => (
              <SelectItem key={i.value} value={i.value}>
                {i.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        {results.length} {results.length === 1 ? "doctor" : "doctors"} found
      </p>

      {results.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="font-medium">No doctors match your search.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try another name or department, or call the hospital and we&apos;ll help you find the right specialist.
            </p>
          </CardContent>
        </Card>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {results.slice(0, limit).map((d) => {
            const fullName = `Dr. ${d.firstName} ${d.lastName}`;
            return (
              <li key={d.id}>
                <Card size="sm" className="h-full">
                  <CardContent className="flex h-full flex-col gap-2.5">
                    <div>
                      <p className="font-semibold leading-snug">{fullName}</p>
                      <Badge variant="secondary" className="mt-1.5">{d.department.name}</Badge>
                      {d.specialty && <p className="mt-1.5 text-xs text-muted-foreground">{d.specialty}</p>}
                    </div>
                    <dl className="space-y-1.5 text-sm">
                      {d.room && (
                        <div className="flex gap-2">
                          <dt><DoorOpen className="mt-0.5 size-4 text-primary" aria-label="Clinic room" /></dt>
                          <dd>{d.room}</dd>
                        </div>
                      )}
                      {d.schedule && (
                        <div className="flex gap-2">
                          <dt><Clock className="mt-0.5 size-4 text-primary" aria-label="Clinic hours" /></dt>
                          <dd className="text-muted-foreground">{d.schedule}</dd>
                        </div>
                      )}
                      {(d.local || d.phone) && (
                        <div className="flex gap-2">
                          <dt><Phone className="mt-0.5 size-4 text-primary" aria-label="Contact" /></dt>
                          <dd className="text-muted-foreground">
                            {[d.local && `Local ${d.local}`, d.phone].filter(Boolean).join(" · ")}
                          </dd>
                        </div>
                      )}
                    </dl>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-auto w-fit"
                      render={
                        <Link
                          href={`/appointments?doctor=${encodeURIComponent(fullName)}&department=${encodeURIComponent(d.department.name)}`}
                        />
                      }
                    >
                      <CalendarCheck /> Request appointment
                    </Button>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      )}

      {results.length > limit && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setLimit((l) => l + PAGE_SIZE)}>
            Show more doctors ({results.length - limit} more)
          </Button>
        </div>
      )}
    </div>
  );
}
