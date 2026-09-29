import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { serviceSchema } from "@/lib/validations/website";
import { requireAdmin, writeErrorResponse } from "@/lib/website-admin";

// POST /api/website/services — Admin only: create a service center
export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = serviceSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const created = await db.serviceCenter.create({ data: parsed.data });
    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    return writeErrorResponse(e);
  }
}
