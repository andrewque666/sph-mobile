import type { Metadata } from "next";
import { CalendarDays, FileText, Mail, MapPin, Phone, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeading } from "@/components/marketing/section-heading";
import { IRB } from "@/components/marketing/site-data";

export const metadata: Metadata = {
  title: "Institutional Review Board (IRB)",
  description:
    "The PHREB-accredited SPHI Institutional Review Board — mission, members, submission requirements, forms, guidelines and 2026 meeting schedule.",
  alternates: { canonical: "/irb" },
};

export default function IrbPage() {
  return (
    <>
      <PageHero
        eyebrow="Research ethics"
        title="Institutional Review Board"
        description={IRB.vision}
        crumbs={[{ label: "Services", href: "/services" }, { label: "IRB" }]}
      >
        <Button render={<a href={`mailto:${IRB.email}`} />}>
          <Mail /> Email the IRB
        </Button>
      </PageHero>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:px-6">
        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="History" title="From ethics committee to PHREB-accredited board" />
            <div className="space-y-4 text-muted-foreground">
              {IRB.history.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="font-semibold">Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal space-y-2 pl-5 text-sm">
                {IRB.mission.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ol>
              <div className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
                <p className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {IRB.location}</p>
                <p className="flex gap-2"><Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {IRB.phone}</p>
                <p className="flex gap-2"><Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> <a href={`mailto:${IRB.email}`} className="text-primary hover:underline">{IRB.email}</a></p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="irb-members">
          <SectionHeading id="irb-members" eyebrow={`As of ${IRB.membersAsOf}`} title="Organizational chart" />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {IRB.members.map((m) => (
              <li key={m.name} className="rounded-xl bg-card p-4 ring-1 ring-foreground/10">
                <p className="font-semibold">{m.name}</p>
                <p className="text-sm text-primary">{m.role}</p>
                <p className="text-sm text-muted-foreground">{m.field}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-semibold">
                <FileText className="size-5 text-primary" aria-hidden /> SOP & submission forms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                {IRB.forms.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                Request the latest copies of these documents from the IRB Secretariat at{" "}
                <a href={`mailto:${IRB.email}?subject=IRB%20forms%20request`} className="font-medium text-primary hover:underline">{IRB.email}</a>.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-semibold">
                <CalendarDays className="size-5 text-primary" aria-hidden /> 2026 meeting dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-muted-foreground">Submission cut-off: every 21st of the month, until 4:00 PM.</p>
              <ul className="grid grid-cols-2 gap-1.5 text-sm">
                {IRB.meetingDates.map((d) => (
                  <li key={d}>{d.replace(", 2026", "")}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="irb-guidelines">
          <SectionHeading id="irb-guidelines" eyebrow="References" title="National & international guidelines" />
          <ul className="flex flex-wrap gap-2">
            {IRB.guidelines.map((g) => (
              <li key={g} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground">
                <BookOpen className="size-3.5" aria-hidden /> {g}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="irb-faq">
          <SectionHeading id="irb-faq" eyebrow="FAQs" title="Frequently asked questions" description={`Can't find your answer? Email us at ${IRB.email}.`} />
          <div className="divide-y divide-border rounded-xl bg-card ring-1 ring-foreground/10">
            {IRB.faqs.map((f) => (
              <details key={f.q} className="group px-4 py-3 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                  {f.q}
                  <span aria-hidden className="text-lg leading-none text-muted-foreground transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
