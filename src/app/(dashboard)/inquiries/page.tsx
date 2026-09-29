import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarCheck, Mail, Phone } from "lucide-react";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AdminPageHeader } from "@/components/website-admin/admin-page-header";
import { InquiryStatusSelect } from "@/components/website-admin/inquiry-status-select";
import { formatDate } from "@/lib/website";
import { cn } from "@/lib/utils";

const FILTERS = [
  { value: "open", label: "Open" },
  { value: "APPOINTMENT", label: "Appointments" },
  { value: "GENERAL", label: "Messages" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "all", label: "All" },
] as const;

type Filter = (typeof FILTERS)[number]["value"];

function whereFor(filter: Filter) {
  switch (filter) {
    case "open":
      return { status: { in: ["NEW" as const, "IN_PROGRESS" as const] } };
    case "APPOINTMENT":
    case "GENERAL":
      return { type: filter, status: { not: "RESOLVED" as const } };
    case "RESOLVED":
      return { status: "RESOLVED" as const };
    default:
      return {};
  }
}

export default async function InquiriesPage({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
  const session = await auth();
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "STAFF")) redirect("/dashboard");

  const { filter: raw } = await searchParams;
  const filter: Filter = FILTERS.some((f) => f.value === raw) ? (raw as Filter) : "open";
  const inquiries = await db.inquiry.findMany({ where: whereFor(filter), orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <div className="space-y-4 md:space-y-6">
      <AdminPageHeader title="Website inquiries" description="Contact messages and appointment requests submitted from the public website." />

      <nav aria-label="Filter inquiries" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.value}
            href={`/inquiries?filter=${f.value}`}
            aria-current={filter === f.value ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              filter === f.value ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"
            )}
          >
            {f.label}
          </Link>
        ))}
      </nav>

      {inquiries.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No inquiries here.</p>
      ) : (
        <ul className="space-y-3">
          {inquiries.map((i) => (
            <li key={i.id}>
              <Card>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{i.name}</p>
                        <Badge variant={i.type === "APPOINTMENT" ? "default" : "secondary"}>
                          {i.type === "APPOINTMENT" ? "Appointment request" : "Message"}
                        </Badge>
                        {i.status === "NEW" && <Badge variant="outline">New</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Received {formatDate(i.createdAt, { dateStyle: "medium", timeStyle: "short" })}
                      </p>
                    </div>
                    <InquiryStatusSelect id={i.id} status={i.status} />
                  </div>

                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
                    <a href={`mailto:${i.email}`} className="inline-flex items-center gap-1.5 text-primary hover:underline">
                      <Mail className="size-4" aria-hidden /> {i.email}
                    </a>
                    {i.phone && (
                      <a href={`tel:${i.phone}`} className="inline-flex items-center gap-1.5 text-primary hover:underline">
                        <Phone className="size-4" aria-hidden /> {i.phone}
                      </a>
                    )}
                  </div>

                  {(i.subject || i.department || i.doctor || i.preferredDate) && (
                    <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                      {i.subject && (<div><dt className="inline text-muted-foreground">Subject: </dt><dd className="inline">{i.subject}</dd></div>)}
                      {i.department && (<div><dt className="inline text-muted-foreground">Department/service: </dt><dd className="inline">{i.department}</dd></div>)}
                      {i.doctor && (<div><dt className="inline text-muted-foreground">Doctor: </dt><dd className="inline">{i.doctor}</dd></div>)}
                      {i.preferredDate && (
                        <div className="flex items-center gap-1.5">
                          <CalendarCheck className="size-4 text-primary" aria-hidden />
                          <dt className="sr-only">Preferred date</dt>
                          <dd>{formatDate(i.preferredDate, { dateStyle: "full" })}</dd>
                        </div>
                      )}
                    </dl>
                  )}

                  <p className="whitespace-pre-line rounded-lg bg-muted/60 p-3 text-sm">{i.message}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
