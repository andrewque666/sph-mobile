import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Search,
  Phone,
  FileText,
  Clock,
  ShieldCheck,
  BedDouble,
  Stethoscope,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResultViewer } from "@/components/marketing/result-viewer";
import { CtaBand } from "@/components/marketing/cta-band";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceCard } from "@/components/marketing/service-card";
import { PostCard } from "@/components/marketing/post-card";
import {
  SITE,
  STATS,
  VISION,
  CORE_VALUES,
  ISO_STANDARDS,
  PATIENT_GUIDE,
  SERVICE_GROUP_LABELS,
} from "@/components/marketing/site-data";
import { getServices, getPosts } from "@/lib/website";

export default async function HomePage() {
  const [services, posts] = await Promise.all([getServices(), getPosts(undefined, 3)]);
  const featured = services.filter((s) => s.group === "SPECIALTY_HUB" || s.group === "CANCER_CARE");
  const groupCounts = Object.entries(SERVICE_GROUP_LABELS).map(([key, meta]) => ({
    key,
    ...meta,
    count: services.filter((s) => s.group === key).length,
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div aria-hidden className="absolute -right-24 -top-24 size-96 rounded-full bg-white/10" />
        <div aria-hidden className="absolute -bottom-40 left-1/3 size-96 rounded-full bg-white/5" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/70">
              Since 1911 · Sisters of St. Paul of Chartres
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              {SITE.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-base text-pretty text-primary-foreground/85">
              A tertiary level training general hospital in the heart of Iloilo City — delivering
              integrated, holistic and dynamic care for the physical, emotional, mental and
              spiritual well-being of every patient.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" variant="secondary" render={<Link href="/appointments" />}>
                <CalendarCheck /> Request an appointment
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                render={<Link href="/services" />}
              >
                Explore services <ArrowRight />
              </Button>
            </div>
          </div>

          {/* Quick access panel */}
          <Card className="text-card-foreground shadow-xl">
            <CardContent className="space-y-5 py-2">
              <form action="/find-a-doctor" method="get" role="search" className="space-y-2">
                <label htmlFor="hero-doctor" className="text-sm font-semibold">
                  Find a doctor
                </label>
                <div className="flex gap-2">
                  <Input id="hero-doctor" name="q" placeholder="Name or specialty, e.g. Pediatrics" className="h-10" />
                  <Button type="submit" size="icon-lg" className="size-10" aria-label="Search doctors">
                    <Search />
                  </Button>
                </div>
              </form>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {[
                  { href: "/results", label: "View results", icon: FileText },
                  { href: "/patients-and-visitors#visiting-hours", label: "Visiting hours", icon: Clock },
                  { href: "/patients-and-visitors#philhealth", label: "PhilHealth & HMO", icon: ShieldCheck },
                  { href: "/patients-and-visitors#admission", label: "Admission guide", icon: BedDouble },
                ].map(({ href, label, icon: Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5 font-medium text-secondary-foreground transition-colors hover:bg-accent"
                    >
                      <Icon className="size-4 shrink-0 text-primary" aria-hidden /> {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <a
                href={SITE.contact.phoneHref}
                className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-destructive text-primary-foreground">
                  <Phone className="size-4" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground">24/7 Emergency Room</span>
                  <span className="block text-sm font-semibold">{SITE.contact.phone}</span>
                </span>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats band */}
      <section aria-label="SPHI at a glance" className="border-b border-border bg-secondary px-4 py-10 sm:px-6">
        <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col text-center">
              <dt className="order-2 mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</dt>
              <dd className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Specialty hub */}
      {featured.length > 0 && (
        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Specialty Hub"
              title="Centers of excellence"
              description="Advanced, first-in-Iloilo facilities for respiratory, cardiovascular, hyperbaric and cancer care."
            >
              <Button variant="outline" render={<Link href="/services" />}>
                All services <ChevronRight />
              </Button>
            </SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {groupCounts.map((g) => (
                <li key={g.key}>
                  <Link
                    href={`/services#${g.key.toLowerCase()}`}
                    className="flex h-full items-center justify-between gap-3 rounded-xl bg-card px-4 py-3 text-sm ring-1 ring-foreground/10 transition-colors hover:bg-accent"
                  >
                    <span>
                      <span className="block font-semibold">{g.label}</span>
                      <span className="block text-xs text-muted-foreground">
                        {g.count} {g.count === 1 ? "service" : "services"}
                      </span>
                    </span>
                    <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* About teaser */}
      <section className="bg-secondary/50 px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">About SPHI</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              More than a century of Christ-centered healing in Iloilo
            </h2>
            <p className="mt-4 text-muted-foreground">{SITE.intro}</p>
            <blockquote className="mt-5 border-l-4 border-primary pl-4 text-sm italic">{VISION}</blockquote>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button render={<Link href="/about" />}>
                Our story <ArrowRight />
              </Button>
              <Button variant="outline" render={<Link href="/about/accreditation" />}>
                Accreditations
              </Button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {CORE_VALUES.map((v, i) => (
              <Card key={v.title} size="sm" className={i === 0 ? "sm:col-span-2" : undefined}>
                <CardContent>
                  <p className="text-sm font-semibold text-primary">{v.title}</p>
                  <p className="mt-1 line-clamp-3 text-xs text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Online result viewer */}
      <ResultViewer />

      {/* News */}
      {posts.length > 0 && (
        <section className="border-t border-border px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="News & updates" title="What's happening at SPHI">
              <Button variant="outline" render={<Link href="/news" />}>
                All news <ChevronRight />
              </Button>
            </SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Patients & visitors */}
      <section className="bg-secondary/50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Patients & visitors"
            title="Planning your visit"
            description="Everything you need to know before you arrive — admission, visiting hours, PhilHealth and accredited HMOs."
          >
            <Button variant="outline" render={<Link href="/patients-and-visitors" />}>
              Full guide <ChevronRight />
            </Button>
          </SectionHeading>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="space-y-3">
                <Clock className="size-5 text-primary" aria-hidden />
                <h3 className="font-semibold">Visiting hours</h3>
                <dl className="space-y-1.5 text-sm">
                  {PATIENT_GUIDE.visitingHours.map((v) => (
                    <div key={v.area} className="flex justify-between gap-3">
                      <dt className="text-muted-foreground">{v.area}</dt>
                      <dd className="text-right">{v.hours.join(" · ")}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-3">
                <BedDouble className="size-5 text-primary" aria-hidden />
                <h3 className="font-semibold">Admission in 3 steps</h3>
                <ol className="space-y-1.5 text-sm">
                  {PATIENT_GUIDE.admission.map((s, i) => (
                    <li key={s.title} className="flex gap-2">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                        {i + 1}
                      </span>
                      {s.title}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-3">
                <ShieldCheck className="size-5 text-primary" aria-hidden />
                <h3 className="font-semibold">PhilHealth & HMOs</h3>
                <p className="text-sm text-muted-foreground">
                  Accredited PhilHealth provider and partner of {PATIENT_GUIDE.hmos.length} HMOs,
                  including Intellicare, Medicard, PhilCare and Pacific Cross.
                </p>
                <Link href="/patients-and-visitors#philhealth" className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  See requirements <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Accreditation strip */}
      <section aria-label="Certifications" className="px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
          <p className="text-sm text-muted-foreground">
            The first private hospital in Iloilo with <strong className="text-foreground">Triple ISO</strong> Integrated Management System certification
          </p>
          <ul className="flex flex-wrap justify-center gap-3">
            {ISO_STANDARDS.map((s) => (
              <li key={s.code} className="rounded-xl bg-card px-4 py-3 text-left ring-1 ring-foreground/10">
                <p className="text-sm font-semibold text-primary">{s.code}</p>
                <p className="text-xs text-muted-foreground">{s.name}</p>
              </li>
            ))}
            <li className="rounded-xl bg-card px-4 py-3 text-left ring-1 ring-foreground/10">
              <p className="text-sm font-semibold text-primary">DOH Level III</p>
              <p className="text-xs text-muted-foreground">APEX tertiary general hospital</p>
            </li>
          </ul>
        </div>
      </section>

      {/* Have questions */}
      <section className="px-4 pb-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-3xl bg-card p-8 ring-1 ring-foreground/10 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Stethoscope className="size-6" aria-hidden />
            </span>
            <div>
              <h2 className="text-xl font-semibold">Have questions?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Reach out to us and we will provide you with the information you need promptly.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button render={<Link href="/contact" />}>Contact us</Button>
            <Button variant="outline" render={<Link href="/find-a-doctor" />}>Find a doctor</Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
