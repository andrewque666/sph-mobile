import { NextRequest, NextResponse } from "next/server";
import { hashSync } from "bcryptjs";
import { db } from "@/lib/db";
import { patientRegistrationSchema } from "@/lib/validations/patient";
import { auth } from "@/auth";

// POST /api/patients — Public registration
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = patientRegistrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password, firstName, lastName, dateOfBirth, gender, phone, address, bloodType } =
      parsed.data;

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const user = await db.user.create({
      data: {
        email,
        passwordHash: hashSync(password, 10),
        role: "PATIENT",
        patientProfile: {
          create: {
            firstName,
            lastName,
            dateOfBirth: new Date(dateOfBirth),
            gender,
            phone,
            address,
            bloodType: bloodType || null,
          },
        },
      },
      include: { patientProfile: true },
    });

    return NextResponse.json(
      { message: "Registration successful. Awaiting admin approval.", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET /api/patients — Admin/Staff/Doctor only
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role === "PATIENT") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || undefined;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: "insensitive" } },
      { lastName: { contains: search, mode: "insensitive" } },
      { user: { email: { contains: search, mode: "insensitive" } } },
    ];
  }
  if (status) {
    where.status = status;
  }

  const [patients, total] = await Promise.all([
    db.patientProfile.findMany({
      where,
      include: { user: { select: { id: true, email: true, createdAt: true } } },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    db.patientProfile.count({ where }),
  ]);

  return NextResponse.json({
    patients,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}
