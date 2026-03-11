import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

// GET /api/doctors
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const specialty = searchParams.get("specialty") || undefined;

  const where: Record<string, unknown> = {};
  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: "insensitive" } },
      { lastName: { contains: search, mode: "insensitive" } },
    ];
  }
  if (specialty) {
    where.specialty = { contains: specialty, mode: "insensitive" };
  }

  const doctors = await db.doctorProfile.findMany({
    where,
    include: { user: { select: { id: true, email: true } } },
    orderBy: { lastName: "asc" },
  });

  // Get distinct specialties for filter
  const specialties = await db.doctorProfile.findMany({
    select: { specialty: true },
    distinct: ["specialty"],
    orderBy: { specialty: "asc" },
  });

  return NextResponse.json({
    doctors,
    specialties: specialties.map((s) => s.specialty),
  });
}
