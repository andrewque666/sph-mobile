import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ResultViewer } from "@/components/marketing/result-viewer";
import { CtaBand } from "@/components/marketing/cta-band";
import {
  SITE,
  STATS,
  CENTERS_OF_EXCELLENCE,
} from "@/components/marketing/site-data";

export const metadata: Metadata = {
  title: "St. Paul's Hospital of Iloilo — Compassionate, Quality Healthcare",
  description: SITE.description,
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-6 py-20 text-primary-foreground sm:py-24">
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-28 -left-12 size-80 rounded-full bg-white/5" />
        <div className="relative mx-auto max-w-3xl text-center">
          <Badge className="mb-4 bg-white/15 text-primary-foreground">{SITE.motto}</Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{SITE.tagline}</h1>
          <p className="mx-auto mt-5 max-w-xl text-sm text-primary-foreground/80 sm:text-base">
            {SITE.description}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button variant="secondary" render={<Link href="/register" />}>
              e-Patient Portal <ArrowRight />
            </Button>
            <Button
              variant="outline"
              className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              render={<Link href="/services" />}
            >
              <Calendar /> Explore services
            </Button>
          </div>
        </div>
      </section>

      {/* Online Result Viewer */}
      <ResultViewer />

      {/* Stats band */}
      <section className="bg-secondary px-6 py-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Centers of excellence teaser */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Specialty Hub
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                Centers of excellence
              </h2>
            </div>
            <Button variant="link" className="shrink-0 px-0" render={<Link href="/services" />}>
              All services <ChevronRight />
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CENTERS_OF_EXCELLENCE.map((c) => {
              const Icon = c.icon;
              return (
                <Card key={c.code} className="transition-shadow hover:shadow-md">
                  <CardContent className="space-y-3 py-6">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <Badge variant="secondary" className="mb-1.5">{c.code}</Badge>
                      <h3 className="text-sm font-semibold leading-snug">{c.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">{c.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* SSO CTA */}
      <CtaBand />
    </>
  );
}
