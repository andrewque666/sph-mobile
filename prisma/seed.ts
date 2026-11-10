import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { hashSync } from "bcryptjs";
import "dotenv/config";
import { SERVICES, DEPARTMENTS, POSTS } from "./data/website-content";
import directoryDoctors from "./data/directory-doctors.json";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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

  await seedWebsiteContent();
}

/** Public website CMS content. Upserts by slug so re-seeding never clobbers edits. */
async function seedWebsiteContent() {
  for (const [i, s] of SERVICES.entries()) {
    await prisma.serviceCenter.upsert({
      where: { slug: s.slug },
      update: {},
      create: { ...s, sortOrder: i },
    });
  }
  console.log(`Seeded ${SERVICES.length} services`);

  for (const [i, d] of DEPARTMENTS.entries()) {
    await prisma.clinicalDepartment.upsert({
      where: { slug: d.slug },
      update: {},
      create: { ...d, sortOrder: i },
    });
  }
  console.log(`Seeded ${DEPARTMENTS.length} clinical departments`);

  for (const p of POSTS) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...p,
        publishedAt: new Date(p.publishedAt),
        eventDate: p.eventDate ? new Date(p.eventDate) : null,
      },
    });
  }
  console.log(`Seeded ${POSTS.length} posts`);

  // The directory has no natural unique key — only seed it into an empty table.
  if ((await prisma.directoryDoctor.count()) === 0) {
    const departments = await prisma.clinicalDepartment.findMany({ select: { id: true, slug: true } });
    const idBySlug = new Map(departments.map((d) => [d.slug, d.id]));
    await prisma.directoryDoctor.createMany({
      data: directoryDoctors.map((d) => ({
        firstName: d.firstName,
        lastName: d.lastName,
        departmentId: idBySlug.get(d.department)!,
        specialty: d.specialty,
        room: d.room,
        schedule: d.schedule,
        local: d.local,
        phone: d.phone,
      })),
    });
    console.log(`Seeded ${directoryDoctors.length} directory doctors`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
