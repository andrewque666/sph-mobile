import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Check, Gift, Mail } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeading } from "@/components/marketing/section-heading";
import { CAREERS, SITE } from "@/components/marketing/site-data";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join St. Paul's Hospital of Iloilo. Current openings for staff nurses and the requirements for applying.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Serve with us"
        description="Be part of more than a century of Christ-centered, excellent healthcare in Iloilo. We're hiring — fresh graduates are encouraged to apply."
        crumbs={[{ label: "Careers" }]}
      >
        <Button render={<a href="#requirements" />}>Application requirements</Button>
      </PageHero>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:px-6">
        <section aria-labelledby="openings">
          <SectionHeading id="openings" eyebrow="Open positions" title="We are hiring" />
          <div className="grid gap-4 lg:grid-cols-2">
            {CAREERS.openings.map((job) => (
              <Card key={job.title}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Briefcase className="size-5" aria-hidden />
                    </span>
                    <div>
                      <CardTitle className="text-lg font-semibold">{job.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{job.type}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <p className="text-muted-foreground">{job.summary}</p>
                  <div>
                    <p className="mb-2 font-semibold">Qualifications</p>
                    <ul className="space-y-1.5">
                      {job.qualifications.map((q) => (
                        <li key={q} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {q}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 font-semibold">Benefits</p>
                    <ul className="grid gap-1.5 sm:grid-cols-2">
                      {job.benefits.map((b) => (
                        <li key={b} className="flex gap-2"><Gift className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {b}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="requirements" aria-labelledby="requirements-heading" className="scroll-mt-28">
          <SectionHeading
            id="requirements-heading"
            eyebrow="How to apply"
            title="Application requirements"
            description={`Address your letter of application to ${CAREERS.addressee} and submit it with the following to the Human Resource Department.`}
          />
          <ol className="grid gap-2 md:grid-cols-2">
            {CAREERS.requirements.map((r, i) => (
              <li key={r} className="flex gap-3 rounded-lg bg-card px-4 py-3 text-sm ring-1 ring-foreground/10">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">{i + 1}</span>
                {r}
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button render={<Link href="/contact?subject=Job%20application" />}>
              <Mail /> Ask about openings
            </Button>
            <Button variant="outline" render={<a href={SITE.contact.phoneHref} />}>
              Call {SITE.contact.phone}
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
