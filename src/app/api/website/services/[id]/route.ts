import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { serviceSchema } from "@/lib/validations/website";
import { requireAdmin, writeErrorResponse } from "@/lib/website-admin";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/website/services/[id] — Admin only: update a service center
export async function PATCH(req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const parsed = serviceSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const updated = await db.serviceCenter.update({ where: { id }, data: parsed.data });
    return NextResponse.json(updated);
  } catch (e) {
    return writeErrorResponse(e);
  }
}

// DELETE /api/website/services/[id] — Admin only: delete a service center
export async function DELETE(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  try {
    await db.serviceCenter.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (e) {
    return writeErrorResponse(e);
  }
}
