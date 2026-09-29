import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { LEADERSHIP, type Leader } from "@/components/marketing/site-data";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "The Sisters of St. Paul of Chartres, medical staff leadership, department chairmen and department heads of St. Paul's Hospital of Iloilo.",
  alternates: { canonical: "/about/leadership" },
};

function initials(name: string) {
  return name
    .replace(/^(Sr\.|Dr\.|Ms\.|Mrs\.)\s*/i, "")
    .split(/\s+/)
    .filter((w) => /^[A-Z][a-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

function LeaderGrid({ people }: { people: Leader[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {people.map((p) => (
        <li key={p.name}>
          <Card size="sm" className="h-full">
            <CardContent className="flex items-start gap-3">
              <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {initials(p.name)}
              </span>
              <div>
                <p className="font-semibold leading-snug">{p.name}</p>
                {p.roles.map((r) => (
                  <p key={r} className="text-sm text-muted-foreground">{r}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="The team"
        title="Leadership"
        description="SPHI is owned and managed by the Sisters of St. Paul of Chartres, working with our medical staff and department heads to deliver Christ-centered, excellent care."
        crumbs={[{ label: "About", href: "/about" }, { label: "Leadership" }]}
      />
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6">
        <section aria-labelledby="sisters">
          <SectionHeading id="sisters" eyebrow="Administration" title="SPH Sisters" />
          <LeaderGrid people={LEADERSHIP.sisters} />
        </section>
        <section aria-labelledby="medical">
          <SectionHeading id="medical" eyebrow="Medical staff" title="Medical leadership" />
          <LeaderGrid people={LEADERSHIP.medical} />
        </section>
        <section aria-labelledby="chairmen">
          <SectionHeading id="chairmen" eyebrow="Clinical departments" title="Department chairmen" />
          <LeaderGrid people={LEADERSHIP.chairmen} />
        </section>
        <section aria-labelledby="heads">
          <SectionHeading id="heads" eyebrow="Operations" title="Department heads" />
          <LeaderGrid people={LEADERSHIP.heads} />
        </section>
      </div>
    </>
  );
}
