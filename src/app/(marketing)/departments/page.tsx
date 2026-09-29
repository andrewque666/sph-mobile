import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Users, Facebook, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeading } from "@/components/marketing/section-heading";
import { getDepartments } from "@/lib/website";

export const metadata: Metadata = {
  title: "Clinical Departments",
  description:
    "SPHI's clinical departments and accredited residency training programs — Internal Medicine, Surgery, Pediatrics, OB-Gyne, Family Medicine, Radiology, ENT-HNS and more.",
  alternates: { canonical: "/departments" },
};

export default async function DepartmentsPage() {
  const departments = await getDepartments();
  const residency = departments.filter((d) => d.hasResidency);

  return (
    <>
      <PageHero
        eyebrow="Clinical departments"
        title="Specialists across every stage of care"
        description={`As a tertiary level training hospital, SPHI runs ${residency.length} accredited residency training programs alongside its clinical departments.`}
        crumbs={[{ label: "Services", href: "/services" }, { label: "Clinical departments" }]}
      />

      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d) => (
            <Card key={d.id} id={d.slug} className="scroll-mt-28">
              <CardContent className="flex h-full flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold">{d.name}</h2>
                  {d.hasResidency && (
                    <Badge variant="secondary">
                      <GraduationCap /> Residency
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{d.description}</p>
                {d.chairman && (
                  <p className="text-sm">
                    <span className="text-muted-foreground">Chairman: </span>
                    {d.chairman}
                  </p>
                )}
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-sm">
                  {d._count.directoryDoctors > 0 && (
                    <Link href={`/find-a-doctor?department=${d.slug}`} className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
                      <Users className="size-4" aria-hidden /> {d._count.directoryDoctors} doctors <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  )}
                  {d.facebookUrl && (
                    <a href={d.facebookUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                      <Facebook className="size-4" aria-hidden /> Facebook page
                      <span className="sr-only"> for {d.name} (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {residency.length > 0 && (
        <section className="bg-secondary/50 px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Medical education"
              title={`${residency.length} accredited residency training programs`}
              description="Training the next generation of Christ-centered, excellent physicians."
            />
            <ul className="flex flex-wrap gap-2">
              {residency.map((d) => (
                <li key={d.id}>
                  <a href={`#${d.slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-card px-4 py-2 text-sm font-medium ring-1 ring-foreground/10 hover:bg-accent">
                    <GraduationCap className="size-4 text-primary" aria-hidden /> {d.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
