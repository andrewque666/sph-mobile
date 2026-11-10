import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { departmentSchema } from "@/lib/validations/website";
import { requireAdmin, writeErrorResponse } from "@/lib/website-admin";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/website/departments/[id] — Admin only: update a clinical department
export async function PATCH(req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const parsed = departmentSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const updated = await db.clinicalDepartment.update({ where: { id }, data: parsed.data });
    return NextResponse.json(updated);
  } catch (e) {
    return writeErrorResponse(e);
  }
}

// DELETE /api/website/departments/[id] — Admin only: delete a clinical department
export async function DELETE(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  try {
    await db.clinicalDepartment.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (e) {
    return writeErrorResponse(e);
  }
}
