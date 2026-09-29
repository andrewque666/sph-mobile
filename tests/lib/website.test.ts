import { beforeEach, describe, expect, it } from "vitest";
import { db } from "@/lib/db";
import { getDirectoryDoctors, getPost, getPosts, getService, searchSite } from "@/lib/website";
import { resetWebsiteTables } from "../helpers";

/** What the public pages read: drafts and hidden records must never leak. */
beforeEach(async () => {
  await resetWebsiteTables();

  await db.post.createMany({
    data: [
      { slug: "live", title: "Kidney transplant milestone", excerpt: "Live post excerpt", body: "Body", category: "NEWS", publishedAt: new Date("2026-01-02") },
      { slug: "older", title: "Older news", excerpt: "Older excerpt", body: "Body", category: "AWARD", publishedAt: new Date("2025-01-01") },
      { slug: "draft", title: "Kidney draft", excerpt: "Draft excerpt", body: "Body", category: "NEWS", published: false },
    ],
  });
  await db.serviceCenter.createMany({
    data: [
      { slug: "kidney-center", name: "Kidney Center", group: "SPICE", summary: "Dialysis and transplant", body: "Body" },
      { slug: "hidden-service", name: "Hidden Kidney Unit", group: "SPICE", summary: "Hidden", body: "Body", published: false },
    ],
  });
  const live = await db.clinicalDepartment.create({ data: { slug: "im", name: "Internal Medicine", description: "Adults" } });
  const hidden = await db.clinicalDepartment.create({ data: { slug: "old", name: "Old Dept", description: "Gone", published: false } });
  await db.directoryDoctor.createMany({
    data: [
      { firstName: "Helen", lastName: "Caro-Pastolero", departmentId: live.id, specialty: "Nephrology" },
      { firstName: "Hidden", lastName: "Doctor", departmentId: live.id, published: false },
      { firstName: "Orphan", lastName: "Listing", departmentId: hidden.id },
    ],
  });
});

describe("public website queries", () => {
  it("lists only published posts, newest first, filterable by category", async () => {
    expect((await getPosts()).map((p) => p.slug)).toEqual(["live", "older"]);
    expect((await getPosts("AWARD")).map((p) => p.slug)).toEqual(["older"]);
    expect(await getPost("draft")).toBeNull();
  });

  it("hides unpublished services", async () => {
    expect(await getService("kidney-center")).not.toBeNull();
    expect(await getService("hidden-service")).toBeNull();
  });

  it("hides unpublished doctors and doctors in unpublished departments", async () => {
    expect((await getDirectoryDoctors()).map((d) => d.lastName)).toEqual(["Caro-Pastolero"]);
  });

  it("searches across content case-insensitively, excluding drafts", async () => {
    const r = await searchSite("KIDNEY");
    expect(r.posts.map((p) => p.slug)).toEqual(["live"]);
    expect(r.services.map((s) => s.slug)).toEqual(["kidney-center"]);

    const byDoctor = await searchSite("nephro");
    expect(byDoctor.doctors.map((d) => d.lastName)).toEqual(["Caro-Pastolero"]);
  });

  it("ignores queries shorter than 2 characters", async () => {
    const r = await searchSite("k");
    expect(r.posts.length + r.services.length + r.doctors.length + r.departments.length).toBe(0);
  });
});
