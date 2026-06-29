import type { Metadata } from "next";
import { Eye, Target, Award, HeartHandshake } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CtaBand } from "@/components/marketing/cta-band";
import { SITE, VALUES, ACCREDITATIONS } from "@/components/marketing/site-data";

export const metadata: Metadata = {
  title: "About Us — St. Paul's Hospital of Iloilo",
  description:
    "A tertiary-level training general hospital managed by the Sisters of Saint Paul of Chartres — our mission, vision, values and accreditations.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="border-b border-border bg-secondary/40 px-6 py-14">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-3">
            About Us
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Caring for Iloilo, the Pauline way
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {SITE.description}
          </p>
        </div>
      </section>

      {/* Who we are */}
      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Who we are
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">
              A tradition of excellence in healthcare
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              St. Paul&apos;s Hospital of Iloilo, Inc. is a 180-bed tertiary-level training
              general hospital managed by the Sisters of Saint Paul of Chartres. For
              generations, we have delivered compassionate, quality healthcare to the people
              of Western Visayas — combining advanced medical technology with the warmth and
              dignity that define Pauline care.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              As an ISO Integrated Management System–certified institution, we hold ourselves
              to rigorous standards of safety, quality and continuous improvement across every
              department and center of excellence.
            </p>
          </div>
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="space-y-3 py-8">
              <HeartHandshake className="size-8 text-primary-foreground/80" />
              <blockquote className="text-xl font-light leading-relaxed tracking-tight">
                &ldquo;{SITE.motto}&rdquo;
              </blockquote>
              <p className="text-sm text-primary-foreground/70">
                Our commitment to integrated, holistic and dynamic care for every patient.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-muted/40 px-6 py-14">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="space-y-3 py-8">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Eye className="size-5" />
              </span>
              <h3 className="text-lg font-semibold">Our Vision</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                A premier healthcare institution in Western Visayas, recognized for clinical
                excellence, compassionate service and unwavering commitment to the holistic
                well-being of every person we serve.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3 py-8">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Target className="size-5" />
              </span>
              <h3 className="text-lg font-semibold">Our Mission</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                To provide integrated, holistic and dynamic care — nurturing the physical,
                emotional, mental and spiritual well-being of our patients — through skilled
                professionals, modern facilities and the Pauline charism of charity.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Holistic care values */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Our Philosophy
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Holistic care for the whole person
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <Card key={v.title}>
                <CardContent className="space-y-2 py-6 text-center">
                  <h3 className="text-base font-semibold text-primary">{v.title}</h3>
                  <p className="text-xs text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="bg-secondary/40 px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Awards &amp; Certificates
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Accreditations &amp; recognitions
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ACCREDITATIONS.map((a) => (
              <Card key={a.name}>
                <CardContent className="flex flex-col items-center gap-2 py-7 text-center">
                  <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Award className="size-6" />
                  </span>
                  <p className="text-sm font-semibold leading-snug">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
