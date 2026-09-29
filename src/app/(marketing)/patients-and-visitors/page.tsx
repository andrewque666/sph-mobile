import type { Metadata } from "next";
import { BedDouble, Clock, ShieldCheck, Scale, Coffee, Phone, MapPin, Check } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeading } from "@/components/marketing/section-heading";
import { PATIENT_GUIDE } from "@/components/marketing/site-data";

export const metadata: Metadata = {
  title: "Patients & Visitors Guide",
  description:
    "Admission procedure, visiting hours, PhilHealth requirements, accredited HMOs, patients' rights, canteen and parking at St. Paul's Hospital of Iloilo.",
  alternates: { canonical: "/patients-and-visitors" },
};

const SECTIONS = [
  { id: "admission", label: "Admission", icon: BedDouble },
  { id: "visiting-hours", label: "Visiting hours", icon: Clock },
  { id: "philhealth", label: "PhilHealth & HMOs", icon: ShieldCheck },
  { id: "patient-rights", label: "Patients' rights", icon: Scale },
  { id: "amenities", label: "Canteen & parking", icon: Coffee },
];

export default function PatientsAndVisitorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Patients & visitors"
        title="Your guide to St. Paul's Hospital"
        description="A tertiary level training general hospital with a capacity of 180 beds. Here's what to expect before, during and after your stay."
        crumbs={[{ label: "Patients & Visitors" }]}
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[220px_1fr]">
        <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">On this page</p>
          <ul className="flex gap-1 overflow-x-auto lg:flex-col">
            {SECTIONS.map(({ id, label, icon: Icon }) => (
              <li key={id} className="shrink-0">
                <a href={`#${id}`} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                  <Icon className="size-4" aria-hidden /> {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 space-y-16">
          <section id="admission" className="scroll-mt-28">
            <SectionHeading eyebrow="Admission procedure" title="Admission is easy in just 3 steps" />
            <ol className="grid gap-4 md:grid-cols-3">
              {PATIENT_GUIDE.admission.map((s, i) => (
                <li key={s.title}>
                  <Card className="h-full">
                    <CardContent className="space-y-2">
                      <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
                      <h3 className="font-semibold">{s.title}</h3>
                      <p className="text-sm text-muted-foreground">{s.text}</p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ol>
          </section>

          <section id="visiting-hours" className="scroll-mt-28">
            <SectionHeading
              eyebrow="Visiting hours"
              title="We welcome family and friends"
              description="Visiting hours are strictly observed to protect our patients' rest and recovery."
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {PATIENT_GUIDE.visitingHours.map((v) => (
                <Card key={v.area}>
                  <CardContent>
                    <h3 className="font-semibold">{v.area}</h3>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {v.hours.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="philhealth" className="scroll-mt-28 space-y-8">
            <SectionHeading eyebrow="PhilHealth" title="Using your PhilHealth benefits" description={PATIENT_GUIDE.philhealthContact} />
            <div className="divide-y divide-border rounded-xl bg-card ring-1 ring-foreground/10">
              {PATIENT_GUIDE.philhealth.map((f) => (
                <details key={f.q} className="group px-4 py-3 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                    {f.q}
                    <span aria-hidden className="text-lg leading-none text-muted-foreground transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
            <div>
              <h3 className="mb-3 font-semibold">Accredited HMOs</h3>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {PATIENT_GUIDE.hmos.map((h) => (
                  <li key={h} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {h}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="patient-rights" className="scroll-mt-28">
            <SectionHeading
              eyebrow="Mga Karapatan ng Pasyente"
              title="Patients' rights"
              description="We encourage you to speak openly with your health care provider, take part in your treatment choices, and protect your own safety by being well informed and involved in your care. As a patient, you have the right:"
            />
            <ol className="list-decimal space-y-3 pl-5 text-sm marker:font-semibold marker:text-primary">
              {PATIENT_GUIDE.rights.map((r) => (
                <li key={r.slice(0, 30)} className="pl-1">{r}</li>
              ))}
            </ol>
            <p className="mt-6 rounded-xl bg-secondary/60 p-4 text-sm">{PATIENT_GUIDE.grievance}</p>
          </section>

          <section id="amenities" className="scroll-mt-28">
            <SectionHeading eyebrow="Amenities" title="Canteen, bakeshop & parking" />
            <div className="grid gap-4 md:grid-cols-3">
              {PATIENT_GUIDE.amenities.map((a) => (
                <Card key={a.name}>
                  <CardContent className="space-y-2 text-sm">
                    <h3 className="text-base font-semibold">{a.name}</h3>
                    <p className="text-muted-foreground">{a.text}</p>
                    <p className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {a.location}</p>
                    {a.hours && <p className="flex gap-2"><Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {a.hours}</p>}
                    {a.phone && <p className="flex gap-2"><Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {a.phone}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
