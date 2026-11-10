import { vi } from "vitest";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";

type Role = "ADMIN" | "STAFF" | "DOCTOR" | "PATIENT";

/**
 * `@/auth` is mocked in each test file (vi.mock is hoisted there); this sets
 * the session the route handlers will see. Pass null for an anonymous visitor.
 */
export async function signInAs(role: Role | null) {
  const { auth } = await import("@/auth");
  vi.mocked(auth as unknown as () => Promise<unknown>).mockResolvedValue(
    role ? { user: { id: `test-${role}`, email: `${role.toLowerCase()}@test.local`, role } } : null
  );
}

export function jsonRequest(method: string, path: string, body?: unknown) {
  return new NextRequest(`http://localhost${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

export function params(id: string) {
  return { params: Promise.resolve({ id }) };
}

/** Removes all website CMS rows (children before parents). */
export async function resetWebsiteTables() {
  await db.directoryDoctor.deleteMany();
  await db.clinicalDepartment.deleteMany();
  await db.serviceCenter.deleteMany();
  await db.post.deleteMany();
  await db.inquiry.deleteMany();
}
