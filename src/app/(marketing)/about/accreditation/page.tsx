import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import {
  ACCREDITATION_INTRO,
  ACCREDITATIONS,
  ISO_STANDARDS,
  IMS_POLICY,
  ISO_JOURNEY,
} from "@/components/marketing/site-data";

import {
  PARTNER_LOGOS,
  logoForAccreditationItem,
  logosForAccreditationGroup,
} from "@/components/marketing/site-images";

export const metadata: Metadata = {
  title: "Accreditation & IMS Policy",
  description:
    "SPHI's Triple ISO Integrated Management System certification, DOH, PhilHealth, PRC CPD and research accreditations, and our IMS policy statement.",
  alternates: { canonical: "/about/accreditation" },
};

export default function AccreditationPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality & safety"
        title="Accreditation, awards & IMS policy"
        description={ACCREDITATION_INTRO}
        crumbs={[{ label: "About", href: "/about" }, { label: "Accreditation" }]}
      />

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 grid gap-3 sm:grid-cols-3">
            {ISO_STANDARDS.map((s) => (
              <div key={s.code} className="rounded-2xl bg-primary p-5 text-primary-foreground">
                <p className="text-xl font-bold">{s.code}</p>
                <p className="text-sm text-primary-foreground/80">{s.name}</p>
              </div>
            ))}
          </div>

          <div className="space-y-12">
            {ACCREDITATIONS.map((a, idx) => (
              <section key={a.group} aria-labelledby={`accreditation-${idx}`}>
                <div className="flex flex-wrap items-center gap-3">
                  {logosForAccreditationGroup(a.group).map((l) => (
                    <span key={l.src} className="flex items-center rounded-xl bg-white p-2 ring-1 ring-foreground/10">
                      <Image src={l.src} width={l.width} height={l.height} alt={l.name} sizes="96px" className="h-14 w-auto" />
                    </span>
                  ))}
                  <h2 id={`accreditation-${idx}`} className="text-xl font-semibold">{a.group}</h2>
                </div>
                <p className="mt-2 max-w-3xl text-muted-foreground">{a.summary}</p>
                {a.items.length > 0 && (
                  <ul className="mt-4 grid gap-3 md:grid-cols-2">
                    {a.items.map((i) => {
                      const logo = logoForAccreditationItem(i.name);
                      return (
                      <li key={i.name}>
                        <Card size="sm" className="h-full">
                          <CardContent className="flex gap-3">
                            {logo ? (
                              <span className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-white p-1 ring-1 ring-foreground/10">
                                <Image src={logo.src} width={logo.width} height={logo.height} alt={logo.name} sizes="56px" className="max-h-full w-auto" />
                              </span>
                            ) : (
                              <BadgeCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                            )}
                            <div>
                              <p className="font-semibold">{i.name}</p>
                              <p className="text-sm text-muted-foreground">{i.detail}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            ))}

            <section aria-labelledby="partners-heading">
              <h2 id="partners-heading" className="text-xl font-semibold">Partners</h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {PARTNER_LOGOS.map((l) => (
                  <li key={l.src} className="flex items-center gap-3 rounded-xl bg-card p-3 ring-1 ring-foreground/10">
                    <span className="flex items-center rounded-lg bg-white p-1 ring-1 ring-foreground/10">
                      <Image src={l.src} width={l.width} height={l.height} alt="" sizes="56px" className="h-14 w-auto" />
                    </span>
                    <span className="text-sm font-semibold">{l.name}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>

      <section id="ims-policy" className="scroll-mt-28 bg-secondary/50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="Policy" title="SPHI Integrated Management System policy statement" />
          <div className="space-y-4 text-muted-foreground">
            {IMS_POLICY.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="iso-journey" className="scroll-mt-28 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Milestones"
            title="Our ISO–IMS journey"
            description="From the first preparations in 2020 to Triple ISO certification — under the leadership of Sr. Arcelita S. Sarnillo, SPC, with ISO consultant Mr. Eliseo Manarez Jr. and Quality Assurance head Ms. Sonia Amazon, RN."
          />
          <ol className="relative space-y-6 border-l-2 border-primary/20 pl-6">
            {ISO_JOURNEY.map((m) => (
              <li key={m.date} className="relative">
                <span aria-hidden className="absolute -left-[31px] top-1 size-3 rounded-full bg-primary ring-4 ring-background" />
                <p className="text-sm font-semibold">{m.date}</p>
                <p className="text-sm text-muted-foreground">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
