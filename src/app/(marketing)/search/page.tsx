import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHero } from "@/components/marketing/page-hero";
import { NAV } from "@/components/marketing/site-data";
import { searchSite } from "@/lib/website";

export const metadata: Metadata = {
  title: "Search",
  description: "Search services, doctors, departments and news at St. Paul's Hospital of Iloilo.",
  robots: { index: false, follow: true },
};

type Props = { searchParams: Promise<{ q?: string }> };

/** Static pages that aren't in the database, matched by title/keywords. */
const PAGES = [
  { title: "Patients & Visitors Guide", href: "/patients-and-visitors", keywords: "visiting hours admission philhealth hmo insurance rights canteen parking bakeshop" },
  { title: "Online Result Viewer", href: "/results", keywords: "results laboratory imaging cardio neuroscience e-doctor e-patient" },
  { title: "Careers", href: "/careers", keywords: "jobs hiring nurse application requirements employment" },
  { title: "Institutional Review Board", href: "/irb", keywords: "irb research ethics protocol phreb forms" },
  { title: "Leadership", href: "/about/leadership", keywords: "sisters administrator medical director chairmen department heads" },
  { title: "Accreditation & IMS Policy", href: "/about/accreditation", keywords: "iso doh philhealth prc cpd accreditation certification awards" },
  { title: "About SPHI", href: "/about", keywords: "history mission vision core values sisters of st paul of chartres" },
  { title: "Contact Us", href: "/contact", keywords: "contact phone email address map directions" },
  { title: "Request an Appointment", href: "/appointments", keywords: "appointment booking consultation schedule" },
];

function ResultGroup({ title, children, count }: { title: string; count: number; children: React.ReactNode }) {
  if (count === 0) return null;
  return (
    <section aria-label={title}>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        {title} <span className="text-primary">({count})</span>
      </h2>
      <ul className="divide-y divide-border rounded-xl bg-card ring-1 ring-foreground/10">{children}</ul>
    </section>
  );
}

function ResultItem({ href, title, text }: { href: string; title: string; text?: string | null }) {
  return (
    <li>
      <Link href={href} className="block px-4 py-3 hover:bg-muted/60">
        <span className="font-medium text-primary">{title}</span>
        {text && <span className="mt-0.5 line-clamp-2 block text-sm text-muted-foreground">{text}</span>}
      </Link>
    </li>
  );
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim().slice(0, 100);
  const results = await searchSite(query);
  const needle = query.toLowerCase();
  const pages = needle.length >= 2
    ? PAGES.filter((p) => `${p.title} ${p.keywords}`.toLowerCase().includes(needle))
    : [];
  const total = results.services.length + results.departments.length + results.doctors.length + results.posts.length + pages.length;

  return (
    <>
      <PageHero eyebrow="Search" title="Search the site" crumbs={[{ label: "Search" }]}>
        <form action="/search" method="get" role="search" className="flex w-full max-w-xl gap-2">
          <label htmlFor="site-search" className="sr-only">Search</label>
          <Input id="site-search" name="q" defaultValue={query} placeholder="Doctors, services, departments, news…" className="h-11 bg-background" autoFocus />
          <Button type="submit" size="lg" className="h-11">
            <Search /> Search
          </Button>
        </form>
      </PageHero>

      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6">
        {query.length < 2 ? (
          <div>
            <p className="text-muted-foreground">Enter at least 2 characters, or jump to a popular page:</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {NAV.flatMap((g) => g.items ?? [g]).map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="inline-block rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground hover:bg-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {total} {total === 1 ? "result" : "results"} for “{query}”
            </p>
            <ResultGroup title="Pages" count={pages.length}>
              {pages.map((p) => <ResultItem key={p.href} href={p.href} title={p.title} />)}
            </ResultGroup>
            <ResultGroup title="Services" count={results.services.length}>
              {results.services.map((s) => <ResultItem key={s.id} href={`/services/${s.slug}`} title={s.name} text={s.summary} />)}
            </ResultGroup>
            <ResultGroup title="Doctors" count={results.doctors.length}>
              {results.doctors.map((d) => (
                <ResultItem
                  key={d.id}
                  href={`/find-a-doctor?q=${encodeURIComponent(`${d.firstName} ${d.lastName}`)}`}
                  title={`Dr. ${d.firstName} ${d.lastName}`}
                  text={[d.department.name, d.room && `Room ${d.room}`, d.schedule].filter(Boolean).join(" · ")}
                />
              ))}
            </ResultGroup>
            <ResultGroup title="Departments" count={results.departments.length}>
              {results.departments.map((d) => <ResultItem key={d.id} href={`/departments#${d.slug}`} title={d.name} text={d.description} />)}
            </ResultGroup>
            <ResultGroup title="News & updates" count={results.posts.length}>
              {results.posts.map((p) => <ResultItem key={p.id} href={`/news/${p.slug}`} title={p.title} text={p.excerpt} />)}
            </ResultGroup>
            {total === 0 && (
              <p className="rounded-xl bg-secondary/60 p-6 text-center text-sm">
                No results. Try a different word, browse <Link href="/services" className="font-medium text-primary hover:underline">all services</Link>, or{" "}
                <Link href="/contact" className="font-medium text-primary hover:underline">contact us</Link>.
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
}
