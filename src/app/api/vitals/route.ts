import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const createVitalSchema = z.object({
  patientId: z.string(),
  type: z.enum(["WEIGHT", "BLOOD_PRESSURE", "TEMPERATURE", "PULSE"]),
  value: z.string().min(1),
  unit: z.string().min(1),
});

// GET /api/vitals?patientId=xxx
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const patientId = req.nextUrl.searchParams.get("patientId");
  if (!patientId) {
    return NextResponse.json({ error: "patientId required" }, { status: 400 });
  }

  // Patients can only view their own vitals
  if (session.user.role === "PATIENT") {
    const patient = await db.patientProfile.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (!patient || patient.id !== patientId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  // Get the latest vital for each type
  const vitals = await db.vitalSign.findMany({
    where: { patientId },
    orderBy: { takenAt: "desc" },
  });

  // Deduplicate: keep only the latest per type
  const latestByType = new Map<string, typeof vitals[0]>();
  for (const v of vitals) {
    if (!latestByType.has(v.type)) {
      latestByType.set(v.type, v);
    }
  }

  return NextResponse.json({ vitals: Array.from(latestByType.values()) });
}

// POST /api/vitals — Staff/Doctor/Admin can record vitals
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role === "PATIENT") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = createVitalSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const vital = await db.vitalSign.create({
    data: parsed.data,
  });

  return NextResponse.json({ vital }, { status: 201 });
}
