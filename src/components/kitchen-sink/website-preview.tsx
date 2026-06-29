"use client";

import {
  FlaskConical,
  ScanLine,
  HeartPulse,
  Brain,
  Stethoscope,
  UserRound,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  Calendar,
  ChevronRight,
  Facebook,
  Youtube,
  MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BrowserFrame } from "@/components/kitchen-sink/browser-frame";

const NAV = [
  "Home",
  "About Us",
  "Specialty Hub",
  "Services",
  "Directory",
  "News",
  "Careers",
  "Contact",
];

const RESULT_VIEWER: { label: string; icon: LucideIcon }[] = [
  { label: "Laboratory", icon: FlaskConical },
  { label: "Imaging", icon: ScanLine },
  { label: "Cardiology", icon: HeartPulse },
  { label: "Neuroscience", icon: Brain },
  { label: "e-Doctor", icon: Stethoscope },
  { label: "e-Patient", icon: UserRound },
];

const SPECIALTY_HUB = [
  {
    code: "SPARC",
    name: "St. Paul Advanced Robotic Center",
    desc: "Minimally invasive robotic surgery for faster recovery.",
  },
  {
    code: "Cathlab",
    name: "Cardiac Catheterization Lab",
    desc: "Interventional cardiology and angiography services.",
  },
  {
    code: "HBOT",
    name: "Hyperbaric Oxygen Therapy",
    desc: "Accelerated healing through pressurized oxygen treatment.",
  },
];

const STATS = [
  { value: "180", label: "Licensed beds" },
  { value: "ISO", label: "IMS Certified" },
  { value: "24/7", label: "Emergency care" },
  { value: "60+", label: "Specialties" },
];

const NEWS = [
  {
    tag: "Awards",
    date: "Jun 18, 2026",
    title: "SPHI receives ISO Integrated Management System recertification",
  },
  {
    tag: "Health",
    date: "Jun 10, 2026",
    title: "Free cardiovascular screening week at the Cancer Center",
  },
  {
    tag: "Community",
    date: "Jun 02, 2026",
    title: "Residency training program welcomes new medical fellows",
  },
];

export function WebsitePreview() {
  return (
    <BrowserFrame url="sphiloilo.com">
      <div className="bg-background text-foreground">
        {/* Top nav */}
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-card/95 px-6 py-3 backdrop-blur">
          <div className="rounded bg-white/90 px-1.5 py-0.5">
            <img src="/sphlogo.png" alt="SPH" className="h-7 w-auto" />
          </div>
          <nav className="hidden items-center gap-5 text-sm font-medium text-muted-foreground lg:flex">
            {NAV.map((item, i) => (
              <span
                key={item}
                className={i === 0 ? "text-primary" : "hover:text-foreground"}
              >
                {item}
              </span>
            ))}
          </nav>
          <Button size="sm">
            <UserRound /> e-Patient
          </Button>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden bg-primary px-6 py-16 text-primary-foreground">
          <div className="absolute -right-16 -top-16 size-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -left-10 size-72 rounded-full bg-white/5" />
          <div className="relative mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-white/15 text-primary-foreground">
              Serving in Excellence, Moving Forward
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Behind every headline is a commitment to care.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-primary-foreground/80">
              Integrated, holistic and dynamic care for the physical, emotional,
              mental and spiritual well-being of every patient.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button variant="secondary">View Results</Button>
              <Button
                variant="outline"
                className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              >
                <Calendar /> Book a consultation
              </Button>
            </div>
          </div>
        </section>

        {/* Online Result Viewer */}
        <section className="px-6 py-12">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Online Result Viewer
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Access your results, anytime
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {RESULT_VIEWER.map(({ label, icon: Icon }) => (
                <Card
                  key={label}
                  className="group cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <CardContent className="flex flex-col items-center gap-3 py-7 text-center">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-6" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">View {label}</p>
                      <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-primary">
                        Open portal <ArrowRight className="size-3" />
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section className="bg-secondary px-6 py-10">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold tracking-tight text-primary">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Specialty Hub */}
        <section className="px-6 py-12">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Specialty Hub
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                  Centers of excellence
                </h2>
              </div>
              <Button variant="link" className="px-0">
                All services <ChevronRight />
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {SPECIALTY_HUB.map((s) => (
                <Card key={s.code}>
                  <CardContent className="space-y-2 py-6">
                    <Badge variant="secondary">{s.code}</Badge>
                    <h3 className="text-base font-semibold">{s.name}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* News & Updates */}
        <section className="bg-muted/40 px-6 py-12">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                News &amp; Updates
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                What&apos;s happening at SPHI
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {NEWS.map((n) => (
                <Card key={n.title} className="overflow-hidden">
                  <div className="h-28 bg-gradient-to-br from-primary to-primary/60" />
                  <CardContent className="space-y-2 py-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline">{n.tag}</Badge>
                      <span>{n.date}</span>
                    </div>
                    <p className="text-sm font-medium leading-snug">{n.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Awards strip */}
        <section className="px-6 py-10">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4 text-muted-foreground">
            {["ISO 9001", "DOH Accredited", "PhilHealth Partner", "Center of Safety"].map(
              (a) => (
                <div key={a} className="flex items-center gap-2 text-sm font-medium">
                  <Award className="size-5 text-primary" />
                  {a}
                </div>
              )
            )}
          </div>
        </section>

        {/* Contact + footer */}
        <footer className="bg-sidebar px-6 py-10 text-sidebar-foreground">
          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <div className="w-fit rounded bg-white/90 px-1.5 py-0.5">
                <img src="/sphlogo.png" alt="SPH" className="h-7 w-auto" />
              </div>
              <p className="text-xs text-sidebar-foreground/70">
                St. Paul&apos;s Hospital of Iloilo, Inc. A tertiary training general
                hospital managed by the Sisters of Saint Paul of Chartres.
              </p>
              <div className="flex gap-2">
                {[Facebook, MessageCircle, Youtube].map((Icon, i) => (
                  <span
                    key={i}
                    className="flex size-8 items-center justify-center rounded-full bg-white/10"
                  >
                    <Icon className="size-4" />
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Contact</p>
              <p className="flex items-center gap-2 text-sidebar-foreground/70">
                <Phone className="size-4" /> (033) 337 2741
              </p>
              <p className="flex items-center gap-2 text-sidebar-foreground/70">
                <Mail className="size-4" /> info@sphiloilo.com
              </p>
              <p className="flex items-center gap-2 text-sidebar-foreground/70">
                <MapPin className="size-4" /> General Luna St., Iloilo City
              </p>
              <p className="flex items-center gap-2 text-sidebar-foreground/70">
                <Clock className="size-4" /> Open 24 hours
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Services</p>
              {["Cancer Center", "S.P.I.C.E.", "Ancillaries", "Patient Guide"].map(
                (s) => (
                  <p key={s} className="text-sidebar-foreground/70">
                    {s}
                  </p>
                )
              )}
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Quick links</p>
              {["FAQs", "Careers", "Residency Training", "Awards"].map((s) => (
                <p key={s} className="text-sidebar-foreground/70">
                  {s}
                </p>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-8 max-w-5xl border-t border-white/10 pt-4 text-center text-xs text-sidebar-foreground/50">
            © 2026 St. Paul&apos;s Hospital of Iloilo, Inc. All rights reserved.
          </div>
        </footer>
      </div>
    </BrowserFrame>
  );
}
