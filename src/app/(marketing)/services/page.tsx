import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, Stethoscope } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceCard } from "@/components/marketing/service-card";
import { SERVICE_GROUP_LABELS } from "@/components/marketing/site-data";
import { getServices, type ServiceGroup } from "@/lib/website";

export const metadata: Metadata = {
  title: "Services & Centers",
  description:
    "SPHI's specialty hub (SPARC, Cath Lab, HBOT), S.P.I.C.E. centers, Cancer Center and 24/7 ancillary services — emergency, laboratory, imaging and pharmacy.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getServices();
  const groups = (Object.keys(SERVICE_GROUP_LABELS) as ServiceGroup[])
    .map((key) => ({ key, ...SERVICE_GROUP_LABELS[key], items: services.filter((s) => s.group === key) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Comprehensive care, all in one place"
        description="From 24/7 emergency and diagnostics to first-in-Iloilo specialty centers — explore what SPHI offers and how to reach each unit."
        crumbs={[{ label: "Services" }]}
      >
        <Button render={<Link href="/appointments" />}>
          <CalendarCheck /> Request an appointment
        </Button>
        <Button variant="outline" render={<Link href="/departments" />}>
          <Stethoscope /> Clinical departments
        </Button>
      </PageHero>

      {/* In-page jump nav */}
      <nav aria-label="Service categories" className="sticky top-[6.25rem] z-30 border-b border-border bg-background/90 backdrop-blur">
        <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
          {groups.map((g) => (
            <li key={g.key} className="shrink-0">
              <a href={`#${g.key.toLowerCase()}`} className="inline-block rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                {g.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:px-6">
        {groups.map((g) => (
          <section key={g.key} id={g.key.toLowerCase()} aria-labelledby={`${g.key}-heading`} className="scroll-mt-40">
            <SectionHeading id={`${g.key}-heading`} eyebrow={`${g.items.length} ${g.items.length === 1 ? "service" : "services"}`} title={g.label} description={g.description} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </section>
        ))}
        {groups.length === 0 && (
          <p className="text-center text-muted-foreground">Service information is being updated. Please contact us for details.</p>
        )}
      </div>
    </>
  );
}
