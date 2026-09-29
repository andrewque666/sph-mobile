import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { directoryDoctorSchema } from "@/lib/validations/website";
import { requireAdmin, writeErrorResponse } from "@/lib/website-admin";

// POST /api/website/doctors — Admin only: create a directory doctor
export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = directoryDoctorSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const created = await db.directoryDoctor.create({ data: parsed.data });
    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    return writeErrorResponse(e);
  }
}
