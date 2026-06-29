import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ResultViewer } from "@/components/marketing/result-viewer";
import { CtaBand } from "@/components/marketing/cta-band";
import { DEPARTMENTS, CENTERS_OF_EXCELLENCE } from "@/components/marketing/site-data";

export const metadata: Metadata = {
  title: "Services & Departments — St. Paul's Hospital of Iloilo",
  description:
    "Explore SPHI's medical services, departments and centers of excellence — and book seamlessly through the patient app.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Page hero */}
      <section className="border-b border-border bg-secondary/40 px-6 py-14">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-3">
            Services &amp; Departments
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Comprehensive care, all in one place
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            From primary consultations to advanced specialty centers — explore our services
            and continue into the patient app to book a consultation or view your results.
          </p>
        </div>
      </section>

      {/* Centers of excellence */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Centers of Excellence
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Specialty Hub
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {CENTERS_OF_EXCELLENCE.map((c) => {
              const Icon = c.icon;
              return (
                <Card key={c.code} className="transition-shadow hover:shadow-md">
                  <CardContent className="flex gap-4 py-6">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-6" />
                    </span>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{c.code}</Badge>
                        <h3 className="text-sm font-semibold">{c.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{c.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Departments directory */}
      <section className="bg-muted/40 px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Medical Services
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                Departments directory
              </h2>
            </div>
            <Button render={<Link href="/register" />}>
              <CalendarCheck /> Book via e-Patient
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DEPARTMENTS.map((d) => {
              const Icon = d.icon;
              return (
                <Card key={d.name} className="group transition-shadow hover:shadow-md">
                  <CardContent className="flex items-start gap-3 py-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold">{d.name}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">{d.desc}</p>
                      <Link
                        href="/login"
                        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        Find a doctor <ArrowRight className="size-3" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Online Result Viewer */}
      <ResultViewer />

      <CtaBand
        heading="Ready to book your visit?"
        subtext="Create your e-Patient account or sign in to book consultations, find a doctor and view results — one account across the website and the SPH app."
      />
    </>
  );
}
