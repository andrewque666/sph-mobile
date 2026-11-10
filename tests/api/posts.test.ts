import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/website/posts/route";
import { PATCH, DELETE } from "@/app/api/website/posts/[id]/route";
import { db } from "@/lib/db";
import { jsonRequest, params, resetWebsiteTables, signInAs } from "../helpers";

vi.mock("@/auth", () => ({ auth: vi.fn() }));

const valid = {
  title: "SPHI Blood Drive",
  slug: "sphi-blood-drive",
  category: "EVENT",
  excerpt: "Join our blood donation drive this month.",
  body: "First paragraph.\n\nSecond paragraph.",
  imageUrl: "",
  eventDate: "2026-10-20T08:00",
  location: "SPHI Lobby",
  published: true,
  publishedAt: "2026-09-28",
};

async function createPost(overrides: Record<string, unknown> = {}) {
  const res = await POST(jsonRequest("POST", "/api/website/posts", { ...valid, ...overrides }));
  return { res, body: await res.json() };
}

beforeEach(async () => {
  await resetWebsiteTables();
  await signInAs("ADMIN");
});

describe("POST /api/website/posts", () => {
  it("creates a post, reading date inputs as Manila time", async () => {
    const { res, body } = await createPost();
    expect(res.status).toBe(201);
    expect(body.slug).toBe("sphi-blood-drive");
    expect(body.imageUrl).toBeNull();
    expect(body.eventDate).toBe("2026-10-20T00:00:00.000Z"); // 08:00 UTC+8
    expect(body.publishedAt).toBe("2026-09-27T16:00:00.000Z"); // midnight UTC+8
    expect(await db.post.count()).toBe(1);
  });

  it("defaults publishedAt to now when omitted", async () => {
    const before = Date.now();
    const { body } = await createPost({ publishedAt: undefined });
    expect(new Date(body.publishedAt).getTime()).toBeGreaterThanOrEqual(before - 1000);
  });

  it("rejects invalid input with field errors", async () => {
    const { res, body } = await createPost({ title: "x", slug: "Bad Slug", excerpt: "short", body: "", imageUrl: "not-a-url" });
    expect(res.status).toBe(400);
    expect(Object.keys(body.error)).toEqual(expect.arrayContaining(["title", "slug", "excerpt", "body", "imageUrl"]));
    expect(await db.post.count()).toBe(0);
  });

  it("returns 409 for a duplicate slug", async () => {
    await createPost();
    const { res, body } = await createPost({ title: "Another" });
    expect(res.status).toBe(409);
    expect(body.error).toMatch(/slug/i);
  });

  it.each([null, "STAFF", "DOCTOR", "PATIENT"] as const)("forbids %s", async (role) => {
    await signInAs(role);
    const { res } = await createPost();
    expect(res.status).toBe(403);
    expect(await db.post.count()).toBe(0);
  });
});

describe("PATCH /api/website/posts/[id]", () => {
  it("updates a post", async () => {
    const { body: created } = await createPost();
    const res = await PATCH(
      jsonRequest("PATCH", `/api/website/posts/${created.id}`, { ...valid, title: "Updated title", published: false }),
      params(created.id)
    );
    expect(res.status).toBe(200);
    const saved = await db.post.findUniqueOrThrow({ where: { id: created.id } });
    expect(saved.title).toBe("Updated title");
    expect(saved.published).toBe(false);
  });

  it("returns 404 for an unknown id", async () => {
    const res = await PATCH(jsonRequest("PATCH", "/api/website/posts/missing", valid), params("missing"));
    expect(res.status).toBe(404);
  });

  it("returns 400 for invalid input", async () => {
    const { body: created } = await createPost();
    const res = await PATCH(jsonRequest("PATCH", `/api/website/posts/${created.id}`, { ...valid, category: "BLOG" }), params(created.id));
    expect(res.status).toBe(400);
  });

  it("forbids non-admins", async () => {
    const { body: created } = await createPost();
    await signInAs("STAFF");
    const res = await PATCH(jsonRequest("PATCH", `/api/website/posts/${created.id}`, valid), params(created.id));
    expect(res.status).toBe(403);
  });
});

describe("DELETE /api/website/posts/[id]", () => {
  it("deletes a post, then 404s on a second delete", async () => {
    const { body: created } = await createPost();
    const req = () => jsonRequest("DELETE", `/api/website/posts/${created.id}`);
    expect((await DELETE(req(), params(created.id))).status).toBe(200);
    expect(await db.post.count()).toBe(0);
    expect((await DELETE(req(), params(created.id))).status).toBe(404);
  });

  it("forbids anonymous visitors", async () => {
    const { body: created } = await createPost();
    await signInAs(null);
    const res = await DELETE(jsonRequest("DELETE", `/api/website/posts/${created.id}`), params(created.id));
    expect(res.status).toBe(403);
    expect(await db.post.count()).toBe(1);
  });
});
