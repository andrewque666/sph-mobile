import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarCheck, Check, Clock, MapPin, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHero } from "@/components/marketing/page-hero";
import { ServiceCard } from "@/components/marketing/service-card";
import { SERVICE_GROUP_LABELS, SITE } from "@/components/marketing/site-data";
import { SERVICE_IMAGES } from "@/components/marketing/site-images";
import { getService, getServices, paragraphs } from "@/lib/website";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const related = (await getServices()).filter((s) => s.group === service.group && s.id !== service.id).slice(0, 3);
  const group = SERVICE_GROUP_LABELS[service.group];
  const image = SERVICE_IMAGES[service.slug];

  return (
    <>
      <PageHero
        eyebrow={group.label}
        title={service.name}
        description={service.tagline ?? service.summary}
        crumbs={[{ label: "Services", href: "/services" }, { label: service.shortName ?? service.name }]}
      >
        <Button render={<Link href={`/appointments?service=${encodeURIComponent(service.name)}`} />}>
          <CalendarCheck /> Request an appointment
        </Button>
        {service.phone && (
          <Button variant="outline" render={<a href={SITE.contact.phoneHref} />}>
            <Phone /> Call the hospital
          </Button>
        )}
      </PageHero>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0 space-y-10">
          {image && (
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              priority
              sizes="(min-width: 1152px) 784px, 100vw"
              className="h-auto w-full rounded-xl ring-1 ring-foreground/10"
            />
          )}
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            {paragraphs(service.body).map((p) => (
              <p key={p.slice(0, 40)} className="whitespace-pre-line">{p}</p>
            ))}
          </div>

          {service.offerings.length > 0 && (
            <section aria-labelledby="offerings">
              <h2 id="offerings" className="mb-4 text-xl font-semibold">Services offered</h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {service.offerings.map((o) => (
                  <li key={o} className="flex gap-2 rounded-lg bg-secondary/60 px-3 py-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {o}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <Card>
            <CardHeader>
              <CardTitle className="font-semibold">Contact &amp; hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {service.shortName && <Badge variant="secondary">{service.shortName}</Badge>}
              {service.phone && (
                <p className="flex gap-2">
                  <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <span>{service.phone}</span>
                </p>
              )}
              {service.schedule && (
                <p className="flex gap-2">
                  <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <span>{service.schedule}</span>
                </p>
              )}
              {service.location && (
                <p className="flex gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <span>{service.location}</span>
                </p>
              )}
              <Button className="mt-2 w-full" render={<Link href={`/contact?subject=${encodeURIComponent(service.name)}`} />}>
                Send an inquiry
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="border-t border-border bg-secondary/40 px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 id="related" className="mb-6 text-xl font-semibold">More in {group.label}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
