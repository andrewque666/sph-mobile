import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

// POST /api/patients/[id]/approve
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const action = body.action as "approve" | "reject";

  if (!["approve", "reject"].includes(action)) {
    return NextResponse.json(
      { error: "Invalid action. Must be 'approve' or 'reject'" },
      { status: 400 }
    );
  }

  const patient = await db.patientProfile.findUnique({ where: { id } });
  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  const updated = await db.patientProfile.update({
    where: { id },
    data: {
      status: action === "approve" ? "APPROVED" : "REJECTED",
      reviewedBy: session.user.id,
      reviewedAt: new Date(),
    },
    include: { user: { select: { id: true, email: true } } },
  });

  return NextResponse.json({
    message: `Patient ${action === "approve" ? "approved" : "rejected"} successfully`,
    patient: updated,
  });
}
