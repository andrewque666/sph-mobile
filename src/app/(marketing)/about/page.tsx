import type { Metadata } from "next";
import Link from "next/link";
import { Eye, Target, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeading } from "@/components/marketing/section-heading";
import { CtaBand } from "@/components/marketing/cta-band";
import {
  SITE,
  HISTORY,
  MILESTONES,
  VISION,
  MISSION,
  CORE_VALUES,
} from "@/components/marketing/site-data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The history, vision, mission and core values of St. Paul's Hospital of Iloilo — founded in 1911 and managed by the Sisters of St. Paul of Chartres.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SPHI"
        title="A haven for the sick in the heart of Iloilo City since 1911"
        description={SITE.intro}
        crumbs={[{ label: "About" }]}
      >
        <Button render={<Link href="/about/leadership" />}>Our leadership</Button>
        <Button variant="outline" render={<Link href="/about/accreditation" />}>Accreditation</Button>
      </PageHero>

      {/* Vision & mission */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <span className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Eye className="size-5" aria-hidden />
              </span>
              <CardTitle className="text-lg font-semibold">Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base">{VISION}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <span className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Target className="size-5" aria-hidden />
              </span>
              <CardTitle className="text-lg font-semibold">Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm text-muted-foreground">We commit ourselves to:</p>
              <ol className="list-decimal space-y-2 pl-5 text-sm">
                {MISSION.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core values */}
      <section className="bg-secondary/50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Core values" title="What guides every encounter" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CORE_VALUES.map((v) => (
              <Card key={v.title}>
                <CardContent className="space-y-2">
                  <span className="text-3xl font-bold text-primary/30" aria-hidden>{v.title[0]}</span>
                  <h3 className="font-semibold">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading eyebrow="History" title="The humble beginning" />
            <div className="space-y-4 text-muted-foreground">
              {HISTORY.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </div>
          <aside aria-label="Milestones">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Milestones</h3>
            <ol className="relative space-y-6 border-l-2 border-primary/20 pl-6">
              {MILESTONES.map((m) => (
                <li key={m.year} className="relative">
                  <span aria-hidden className="absolute -left-[31px] top-1 size-3 rounded-full bg-primary ring-4 ring-background" />
                  <p className="text-sm font-semibold">{m.year}</p>
                  <p className="text-sm text-muted-foreground">{m.text}</p>
                </li>
              ))}
            </ol>
            <Button variant="link" className="mt-4 px-0" render={<Link href="/about/accreditation#iso-journey" />}>
              Our ISO journey <ArrowRight />
            </Button>
          </aside>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
