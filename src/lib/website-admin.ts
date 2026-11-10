import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { Prisma } from "@/generated/prisma/client";

/** Returns a 403 response unless the caller is an admin (website CMS routes). */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}

/** Maps expected Prisma write errors to client responses; rethrows anything else. */
export function writeErrorResponse(e: unknown) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === "P2002") {
      return NextResponse.json({ error: "That slug is already in use" }, { status: 409 });
    }
    if (e.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (e.code === "P2003") {
      return NextResponse.json(
        { error: "This item is still referenced by other records (e.g. doctors in a department)" },
        { status: 409 }
      );
    }
  }
  throw e;
}
