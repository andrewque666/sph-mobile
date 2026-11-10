import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone, Siren, Navigation, CalendarCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHero } from "@/components/marketing/page-hero";
import { InquiryForm } from "@/components/marketing/inquiry-form";
import { SITE } from "@/components/marketing/site-data";
import { getServices } from "@/lib/website";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact St. Paul's Hospital of Iloilo — General Luna Street, Iloilo City. Tel. (033) 337-27-42 to 49, sphiloilo@gmail.com. Send us a message online.",
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: Promise<{ subject?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { subject } = await searchParams;
  const units = (await getServices()).filter((s) => s.phone && s.phone !== "(033) 337-27-42 to 49");

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="We're here to help"
        description="Reach out to us and we will provide you with the information you need promptly."
        crumbs={[{ label: "Contact" }]}
      />

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_380px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Drop us a line</CardTitle>
          </CardHeader>
          <CardContent>
            <InquiryForm type="GENERAL" defaults={{ subject: subject?.slice(0, 160) }} />
          </CardContent>
        </Card>

        <aside className="space-y-4">
          <a href={SITE.contact.phoneHref} className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
            <Siren className="size-6 shrink-0 text-destructive" aria-hidden />
            <span>
              <span className="block text-sm font-semibold">Medical emergency?</span>
              <span className="block text-sm text-muted-foreground">Go to our 24/7 Emergency Room or call {SITE.contact.phone}.</span>
            </span>
          </a>
          <Card>
            <CardContent className="space-y-4 text-sm">
              <p className="font-semibold">{SITE.legalName}</p>
              <p className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {SITE.contact.address}</p>
              <p className="flex gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <a href={SITE.contact.phoneHref} className="hover:underline">{SITE.contact.phone}</a>
              </p>
              <p className="flex gap-2">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <a href={`mailto:${SITE.contact.email}`} className="hover:underline">{SITE.contact.email}</a>
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Button variant="outline" size="sm" render={<a href={SITE.contact.mapUrl} target="_blank" rel="noopener noreferrer" />}>
                  <Navigation /> Get directions
                </Button>
                <Button size="sm" render={<Link href="/appointments" />}>
                  <CalendarCheck /> Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
            <iframe
              title="Map showing St. Paul's Hospital of Iloilo"
              src={SITE.contact.mapEmbed}
              className="aspect-[4/3] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>
      </div>

      {units.length > 0 && (
        <section aria-labelledby="unit-directory" className="border-t border-border bg-secondary/40 px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 id="unit-directory" className="text-xl font-semibold">Department contacts</h2>
            <p className="mt-1 text-sm text-muted-foreground">Dial the trunk line and ask for the local number, or call the unit&apos;s mobile directly.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {units.map((u) => (
                <li key={u.id} className="rounded-xl bg-card p-4 text-sm ring-1 ring-foreground/10">
                  <Link href={`/services/${u.slug}`} className="font-semibold hover:text-primary">{u.name}</Link>
                  <p className="mt-1 text-muted-foreground">{u.phone}</p>
                  {u.location && <p className="text-xs text-muted-foreground">{u.location}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
