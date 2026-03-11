import { NextRequest, NextResponse } from "next/server";
import { hashSync } from "bcryptjs";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { createUserSchema } from "@/lib/validations/user";

// POST /api/users — Admin only: create doctor/staff/admin
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = createUserSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { email, password, role, firstName, lastName, specialty, phone, licenseNumber } =
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
      role,
      ...(role === "DOCTOR" && firstName && lastName && specialty && phone
        ? {
            doctorProfile: {
              create: {
                firstName,
                lastName,
                specialty,
                phone,
                licenseNumber: licenseNumber || null,
              },
            },
          }
        : {}),
    },
    include: { doctorProfile: true },
  });

  return NextResponse.json(
    { message: `${role} account created successfully`, userId: user.id },
    { status: 201 }
  );
}
