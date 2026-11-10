import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/inquiries/route";
import { PATCH } from "@/app/api/inquiries/[id]/route";
import { db } from "@/lib/db";
import { jsonRequest, params, resetWebsiteTables, signInAs } from "../helpers";

vi.mock("@/auth", () => ({ auth: vi.fn() }));

const appointment = {
  type: "APPOINTMENT",
  name: "Juan Dela Cruz",
  email: "juan@example.com",
  phone: "09171234567",
  department: "Pediatrics",
  doctor: "Dr. Josie Castillo",
  preferredDate: "2026-10-05",
  message: "Follow-up consultation for my son.",
};

const message = {
  type: "GENERAL",
  name: "Ana Santos",
  email: "ana@example.com",
  subject: "Billing",
  message: "How do I get a copy of my statement?",
};

async function submit(body: Record<string, unknown>) {
  const res = await POST(jsonRequest("POST", "/api/inquiries", body));
  return { res, body: await res.json() };
}

beforeEach(async () => {
  await resetWebsiteTables();
  await signInAs(null); // the public form is anonymous
});

describe("POST /api/inquiries (public forms)", () => {
  it("stores an appointment request as NEW, with the date read as Manila time", async () => {
    const { res } = await submit(appointment);
    expect(res.status).toBe(201);
    const saved = await db.inquiry.findFirstOrThrow();
    expect(saved).toMatchObject({ type: "APPOINTMENT", status: "NEW", department: "Pediatrics" });
    expect(saved.preferredDate?.toISOString()).toBe("2026-10-04T16:00:00.000Z");
  });

  it("stores a contact message with optional fields left empty", async () => {
    const { res } = await submit(message);
    expect(res.status).toBe(201);
    const saved = await db.inquiry.findFirstOrThrow();
    expect(saved).toMatchObject({ type: "GENERAL", phone: null, doctor: null, preferredDate: null });
  });

  it("requires a phone number for appointment requests only", async () => {
    const { res, body } = await submit({ ...appointment, phone: "" });
    expect(res.status).toBe(400);
    expect(body.error.phone).toBeDefined();
    expect((await submit({ ...message, phone: "" })).res.status).toBe(201);
  });

  it("rejects invalid email, short message and unknown type", async () => {
    const { res, body } = await submit({ ...message, type: "COMPLAINT", email: "nope", message: "hi" });
    expect(res.status).toBe(400);
    expect(Object.keys(body.error)).toEqual(expect.arrayContaining(["type", "email", "message"]));
    expect(await db.inquiry.count()).toBe(0);
  });

  it("rejects a non-JSON body", async () => {
    const { NextRequest } = await import("next/server");
    const res = await POST(new NextRequest("http://localhost/api/inquiries", { method: "POST", body: "not json" }));
    expect(res.status).toBe(400);
  });

  it("silently drops honeypot submissions", async () => {
    const { res } = await submit({ ...message, website: "http://spam.example" });
    expect(res.status).toBe(201);
    expect(await db.inquiry.count()).toBe(0);
  });
});

describe("PATCH /api/inquiries/[id] (status updates)", () => {
  async function createInquiry() {
    await submit(message);
    return (await db.inquiry.findFirstOrThrow()).id;
  }

  it.each(["ADMIN", "STAFF"] as const)("lets %s change the status", async (role) => {
    const id = await createInquiry();
    await signInAs(role);
    const res = await PATCH(jsonRequest("PATCH", `/api/inquiries/${id}`, { status: "IN_PROGRESS" }), params(id));
    expect(res.status).toBe(200);
    expect((await db.inquiry.findUniqueOrThrow({ where: { id } })).status).toBe("IN_PROGRESS");
  });

  it.each([null, "DOCTOR", "PATIENT"] as const)("forbids %s", async (role) => {
    const id = await createInquiry();
    await signInAs(role);
    const res = await PATCH(jsonRequest("PATCH", `/api/inquiries/${id}`, { status: "RESOLVED" }), params(id));
    expect(res.status).toBe(403);
    expect((await db.inquiry.findUniqueOrThrow({ where: { id } })).status).toBe("NEW");
  });

  it("rejects an unknown status and an unknown id", async () => {
    const id = await createInquiry();
    await signInAs("STAFF");
    expect((await PATCH(jsonRequest("PATCH", "/x", { status: "DONE" }), params(id))).status).toBe(400);
    expect((await PATCH(jsonRequest("PATCH", "/x", { status: "RESOLVED" }), params("missing"))).status).toBe(404);
  });
});
