"use client";

import { useState, useEffect } from "react";
import { DoctorCard } from "./doctor-card";
import { SearchInput } from "@/components/shared/search-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

type Doctor = {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  phone: string;
  licenseNumber: string | null;
  user: { id: string; email: string };
};

export function DoctorDirectory() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (specialty && specialty !== "all") params.set("specialty", specialty);

    const timer = setTimeout(() => {
      fetch(`/api/doctors?${params}`)
        .then((res) => res.json())
        .then((data) => {
          setDoctors(data.doctors);
          setSpecialties(data.specialties);
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [search, specialty]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search doctors..."
        />
        <Select value={specialty} onValueChange={(val: string | null) => setSpecialty(val || "")}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="All Specialties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            {specialties.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      ) : doctors.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          No doctors found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      )}
    </div>
  );
}
