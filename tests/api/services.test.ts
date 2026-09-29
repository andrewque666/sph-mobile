import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/website/services/route";
import { PATCH, DELETE } from "@/app/api/website/services/[id]/route";
import { db } from "@/lib/db";
import { jsonRequest, params, resetWebsiteTables, signInAs } from "../helpers";

vi.mock("@/auth", () => ({ auth: vi.fn() }));

const valid = {
  name: "Hyperbaric Oxygen Treatment Center",
  slug: "hbot-center",
  shortName: "HBOT",
  group: "SPECIALTY_HUB",
  tagline: "",
  summary: "Breathing 100% oxygen in a pressurized chamber.",
  body: "Full description of the center.",
  offerings: "Burns\n\n  Acute cerebral edema  \n",
  schedule: "Monday – Friday, 8:00 AM – 5:00 PM",
  phone: "",
  location: "Main Building",
  sortOrder: 2,
  published: true,
};

async function createService(overrides: Record<string, unknown> = {}) {
  const res = await POST(jsonRequest("POST", "/api/website/services", { ...valid, ...overrides }));
  return { res, body: await res.json() };
}

beforeEach(async () => {
  await resetWebsiteTables();
  await signInAs("ADMIN");
});

describe("POST /api/website/services", () => {
  it("creates a service, splitting offerings by line and nulling blanks", async () => {
    const { res, body } = await createService();
    expect(res.status).toBe(201);
    expect(body.offerings).toEqual(["Burns", "Acute cerebral edema"]);
    expect(body.tagline).toBeNull();
    expect(body.phone).toBeNull();
    expect(body.sortOrder).toBe(2);
  });

  it("rejects an unknown group and a non-numeric sort order", async () => {
    const { res, body } = await createService({ group: "SURGERY", sortOrder: "first" });
    expect(res.status).toBe(400);
    expect(Object.keys(body.error)).toEqual(expect.arrayContaining(["group", "sortOrder"]));
  });

  it("returns 409 for a duplicate slug", async () => {
    await createService();
    expect((await createService({ name: "Other" })).res.status).toBe(409);
  });

  it.each([null, "STAFF", "PATIENT"] as const)("forbids %s", async (role) => {
    await signInAs(role);
    expect((await createService()).res.status).toBe(403);
    expect(await db.serviceCenter.count()).toBe(0);
  });
});

describe("PATCH /api/website/services/[id]", () => {
  it("updates a service", async () => {
    const { body: created } = await createService();
    const res = await PATCH(
      jsonRequest("PATCH", `/api/website/services/${created.id}`, { ...valid, offerings: "Wound care", published: false }),
      params(created.id)
    );
    expect(res.status).toBe(200);
    const saved = await db.serviceCenter.findUniqueOrThrow({ where: { id: created.id } });
    expect(saved.offerings).toEqual(["Wound care"]);
    expect(saved.published).toBe(false);
  });

  it("returns 409 when renaming onto another service's slug", async () => {
    await createService({ slug: "sparc", name: "SPARC" });
    const { body: created } = await createService();
    const res = await PATCH(jsonRequest("PATCH", `/api/website/services/${created.id}`, { ...valid, slug: "sparc" }), params(created.id));
    expect(res.status).toBe(409);
  });

  it("returns 404 for an unknown id", async () => {
    const res = await PATCH(jsonRequest("PATCH", "/api/website/services/missing", valid), params("missing"));
    expect(res.status).toBe(404);
  });
});

describe("DELETE /api/website/services/[id]", () => {
  it("deletes a service, then 404s", async () => {
    const { body: created } = await createService();
    const req = () => jsonRequest("DELETE", `/api/website/services/${created.id}`);
    expect((await DELETE(req(), params(created.id))).status).toBe(200);
    expect((await DELETE(req(), params(created.id))).status).toBe(404);
  });

  it("forbids non-admins", async () => {
    const { body: created } = await createService();
    await signInAs("DOCTOR");
    expect((await DELETE(jsonRequest("DELETE", "/x"), params(created.id))).status).toBe(403);
    expect(await db.serviceCenter.count()).toBe(1);
  });
});
