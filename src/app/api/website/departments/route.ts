import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { departmentSchema } from "@/lib/validations/website";
import { requireAdmin, writeErrorResponse } from "@/lib/website-admin";

// POST /api/website/departments — Admin only: create a clinical department
export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = departmentSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const created = await db.clinicalDepartment.create({ data: parsed.data });
    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    return writeErrorResponse(e);
  }
}
