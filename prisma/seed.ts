import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { hashSync } from "bcryptjs";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

type Role = "PATIENT" | "DOCTOR" | "STAFF" | "ADMIN";

/**
 * Idempotent: re-running keeps roles in sync and never overwrites a password
 * that may have been changed after seeding. Safe to run multiple times.
 */
async function upsertUser(email: string, password: string, role: Role) {
  return prisma.user.upsert({
    where: { email },
    update: { role },
    create: { email, passwordHash: hashSync(password, 10), role },
  });
}

async function main() {
  // --- Admin -------------------------------------------------------------
  const admin = await upsertUser("admin@sph.hospital", "admin123", "ADMIN");

  // --- Staff -------------------------------------------------------------
  await upsertUser("staff@sph.hospital", "staff123", "STAFF");

  // --- Doctor (+ profile) ------------------------------------------------
  const doctor = await upsertUser("doctor@sph.hospital", "doctor123", "DOCTOR");
  await prisma.doctorProfile.upsert({
    where: { userId: doctor.id },
    update: {},
    create: {
      userId: doctor.id,
      firstName: "John",
      lastName: "Smith",
      specialty: "General Medicine",
      phone: "+63 33 337 2741",
      licenseNumber: "MD-12345",
    },
  });

  // --- Approved demo patient (+ profile + sample vitals) -----------------
  const patient = await upsertUser("patient@sph.hospital", "patient123", "PATIENT");
  const patientProfile = await prisma.patientProfile.upsert({
    where: { userId: patient.id },
    update: { status: "APPROVED" },
    create: {
      userId: patient.id,
      firstName: "Maria Clara",
      lastName: "Santos",
      dateOfBirth: new Date("1992-03-14"),
      gender: "FEMALE",
      phone: "+63 917 555 0142",
      address: "Jaro, Iloilo City",
      bloodType: "O+",
      status: "APPROVED",
      reviewedBy: admin.id,
      reviewedAt: new Date(),
    },
  });

  const vitalsCount = await prisma.vitalSign.count({
    where: { patientId: patientProfile.id },
  });
  if (vitalsCount === 0) {
    await prisma.vitalSign.createMany({
      data: [
        { patientId: patientProfile.id, type: "WEIGHT", value: "62", unit: "kg" },
        { patientId: patientProfile.id, type: "BLOOD_PRESSURE", value: "118/76", unit: "mmHg" },
        { patientId: patientProfile.id, type: "TEMPERATURE", value: "36.6", unit: "°C" },
        { patientId: patientProfile.id, type: "PULSE", value: "72", unit: "bpm" },
      ],
    });
  }

  // --- Pending patient (to demo the admin approval queue) ----------------
  const pending = await upsertUser("pending@sph.hospital", "patient123", "PATIENT");
  await prisma.patientProfile.upsert({
    where: { userId: pending.id },
    update: {},
    create: {
      userId: pending.id,
      firstName: "Juan",
      lastName: "Dela Cruz",
      dateOfBirth: new Date("1988-09-02"),
      gender: "MALE",
      phone: "+63 917 555 0199",
      address: "La Paz, Iloilo City",
      bloodType: "A+",
      status: "PENDING",
    },
  });

  console.log("Seed complete. Demo accounts:");
  console.log("  admin@sph.hospital    / admin123    (ADMIN)");
  console.log("  staff@sph.hospital    / staff123    (STAFF)");
  console.log("  doctor@sph.hospital   / doctor123   (DOCTOR)");
  console.log("  patient@sph.hospital  / patient123  (PATIENT — approved, with vitals)");
  console.log("  pending@sph.hospital  / patient123  (PATIENT — pending approval)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
