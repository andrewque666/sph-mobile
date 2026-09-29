import { cache } from "react";
import { db } from "@/lib/db";
import type { PostCategory, ServiceGroup } from "@/generated/prisma/client";

/** Published-content queries for the public website. */

export const getServices = cache(() =>
  db.serviceCenter.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  })
);

export const getService = cache((slug: string) =>
  db.serviceCenter.findFirst({ where: { slug, published: true } })
);

export const getDepartments = cache(() =>
  db.clinicalDepartment.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { _count: { select: { directoryDoctors: { where: { published: true } } } } },
  })
);

export const getDirectoryDoctors = cache(() =>
  db.directoryDoctor.findMany({
    where: { published: true, department: { published: true } },
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
    include: { department: { select: { name: true, slug: true } } },
  })
);

export const getPosts = cache((category?: PostCategory, take?: number) =>
  db.post.findMany({
    where: { published: true, ...(category ? { category } : {}) },
    orderBy: { publishedAt: "desc" },
    take,
  })
);

export const getPost = cache((slug: string) =>
  db.post.findFirst({ where: { slug, published: true } })
);

/** Site-wide search across services, departments, doctors and news. */
export async function searchSite(query: string) {
  const q = query.trim();
  if (q.length < 2) return { services: [], departments: [], doctors: [], posts: [] };
  const contains = { contains: q, mode: "insensitive" as const };

  const [services, departments, doctors, posts] = await Promise.all([
    db.serviceCenter.findMany({
      where: {
        published: true,
        OR: [
          { name: contains },
          { shortName: contains },
          { summary: contains },
          { body: contains },
        ],
      },
      orderBy: { sortOrder: "asc" },
      take: 20,
    }),
    db.clinicalDepartment.findMany({
      where: { published: true, OR: [{ name: contains }, { description: contains }] },
      orderBy: { sortOrder: "asc" },
      take: 20,
    }),
    db.directoryDoctor.findMany({
      where: {
        published: true,
        department: { published: true },
        OR: [
          { firstName: contains },
          { lastName: contains },
          { specialty: contains },
          { department: { name: contains } },
        ],
      },
      include: { department: { select: { name: true } } },
      orderBy: { lastName: "asc" },
      take: 30,
    }),
    db.post.findMany({
      where: { published: true, OR: [{ title: contains }, { excerpt: contains }, { body: contains }] },
      orderBy: { publishedAt: "desc" },
      take: 20,
    }),
  ]);

  return { services, departments, doctors, posts };
}

export type { PostCategory, ServiceGroup };

export function formatDate(d: Date, opts: Intl.DateTimeFormatOptions = { dateStyle: "long" }) {
  return new Intl.DateTimeFormat("en-PH", { timeZone: "Asia/Manila", ...opts }).format(d);
}

/** Splits CMS body text into paragraphs (blank-line separated). */
export function paragraphs(body: string) {
  return body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

/** Date → "YYYY-MM-DD" / "YYYY-MM-DDTHH:mm" in hospital time, for date inputs. */
export function toManilaInput(d: Date | null, withTime = false) {
  if (!d) return "";
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Manila",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(d)
      .map((p) => [p.type, p.value])
  );
  const date = `${parts.year}-${parts.month}-${parts.day}`;
  return withTime ? `${date}T${parts.hour}:${parts.minute}` : date;
}
