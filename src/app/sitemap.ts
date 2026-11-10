import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { SITE } from "@/components/marketing/site-data";

const STATIC_PATHS = [
  "",
  "/about",
  "/about/leadership",
  "/about/accreditation",
  "/services",
  "/departments",
  "/find-a-doctor",
  "/results",
  "/patients-and-visitors",
  "/irb",
  "/careers",
  "/news",
  "/contact",
  "/appointments",
];

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts] = await Promise.all([
    db.serviceCenter.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    db.post.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
  ]);

  return [
    ...STATIC_PATHS.map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: `${SITE.url}/services/${s.slug}`, lastModified: s.updatedAt, priority: 0.6 })),
    ...posts.map((p) => ({ url: `${SITE.url}/news/${p.slug}`, lastModified: p.updatedAt, priority: 0.5 })),
  ];
}
