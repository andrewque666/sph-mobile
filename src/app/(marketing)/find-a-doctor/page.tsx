import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { DoctorFinder } from "@/components/marketing/doctor-finder";
import { getDepartments, getDirectoryDoctors } from "@/lib/website";

export const metadata: Metadata = {
  title: "Find a Doctor",
  description:
    "Search SPHI's doctor directory by name, specialty or department — clinic rooms, clinic hours and local numbers.",
  alternates: { canonical: "/find-a-doctor" },
};

type Props = { searchParams: Promise<{ q?: string; department?: string }> };

export default async function FindADoctorPage({ searchParams }: Props) {
  const { q = "", department = "" } = await searchParams;
  const [doctors, departments] = await Promise.all([getDirectoryDoctors(), getDepartments()]);

  return (
    <>
      <PageHero
        eyebrow="Doctor's clinic directory"
        title="Find a doctor"
        description="Search our consultants by name, specialty or department. Clinic schedules may change — please call the clinic's local number before your visit."
        crumbs={[{ label: "Find a Doctor" }]}
      />
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <DoctorFinder
            doctors={doctors.map(({ id, firstName, lastName, specialty, room, schedule, local, phone, department }) => ({
              id, firstName, lastName, specialty, room, schedule, local, phone, department,
            }))}
            departments={departments.filter((d) => d._count.directoryDoctors > 0).map(({ slug, name }) => ({ slug, name }))}
            initialQuery={q}
            initialDepartment={department}
          />
        </div>
      </section>
    </>
  );
}
