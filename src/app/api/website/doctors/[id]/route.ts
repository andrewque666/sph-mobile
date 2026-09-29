import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { directoryDoctorSchema } from "@/lib/validations/website";
import { requireAdmin, writeErrorResponse } from "@/lib/website-admin";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/website/doctors/[id] — Admin only: update a directory doctor
export async function PATCH(req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const parsed = directoryDoctorSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const updated = await db.directoryDoctor.update({ where: { id }, data: parsed.data });
    return NextResponse.json(updated);
  } catch (e) {
    return writeErrorResponse(e);
  }
}

// DELETE /api/website/doctors/[id] — Admin only: delete a directory doctor
export async function DELETE(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  try {
    await db.directoryDoctor.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (e) {
    return writeErrorResponse(e);
  }
}
