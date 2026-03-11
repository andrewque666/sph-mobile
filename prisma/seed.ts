import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  // Seed admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@sph.hospital" },
    update: {},
    create: {
      email: "admin@sph.hospital",
      passwordHash: hashSync("admin123", 10),
      role: "ADMIN",
    },
  });
  console.log("Seeded admin:", admin.email);

  // Seed sample doctor
  const doctor = await prisma.user.upsert({
    where: { email: "doctor@sph.hospital" },
    update: {},
    create: {
      email: "doctor@sph.hospital",
      passwordHash: hashSync("doctor123", 10),
      role: "DOCTOR",
      doctorProfile: {
        create: {
          firstName: "John",
          lastName: "Smith",
          specialty: "General Medicine",
          phone: "+1234567890",
          licenseNumber: "MD-12345",
        },
      },
    },
  });
  console.log("Seeded doctor:", doctor.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
