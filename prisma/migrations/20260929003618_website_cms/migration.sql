-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('NEWS', 'EVENT', 'AWARD');

-- CreateEnum
CREATE TYPE "ServiceGroup" AS ENUM ('SPECIALTY_HUB', 'SPICE', 'CANCER_CARE', 'ANCILLARY');

-- CreateEnum
CREATE TYPE "InquiryType" AS ENUM ('GENERAL', 'APPOINTMENT');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'RESOLVED');

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "PostCategory" NOT NULL DEFAULT 'NEWS',
    "excerpt" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "imageUrl" TEXT,
    "eventDate" TIMESTAMP(3),
    "location" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_centers" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "group" "ServiceGroup" NOT NULL,
    "tagline" TEXT,
    "summary" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "offerings" TEXT[],
    "schedule" TEXT,
    "phone" TEXT,
    "location" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_centers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clinical_departments" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "chairman" TEXT,
    "hasResidency" BOOLEAN NOT NULL DEFAULT false,
    "facebookUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clinical_departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directory_doctors" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "specialty" TEXT,
    "room" TEXT,
    "schedule" TEXT,
    "local" TEXT,
    "phone" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "directory_doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inquiries" (
    "id" TEXT NOT NULL,
    "type" "InquiryType" NOT NULL,
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "department" TEXT,
    "doctor" TEXT,
    "preferredDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_slug_key" ON "posts"("slug");

-- CreateIndex
CREATE INDEX "posts_published_category_publishedAt_idx" ON "posts"("published", "category", "publishedAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "service_centers_slug_key" ON "service_centers"("slug");

-- CreateIndex
CREATE INDEX "service_centers_published_group_sortOrder_idx" ON "service_centers"("published", "group", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "clinical_departments_slug_key" ON "clinical_departments"("slug");

-- CreateIndex
CREATE INDEX "directory_doctors_departmentId_lastName_idx" ON "directory_doctors"("departmentId", "lastName");

-- CreateIndex
CREATE INDEX "inquiries_status_createdAt_idx" ON "inquiries"("status", "createdAt" DESC);

-- AddForeignKey
ALTER TABLE "directory_doctors" ADD CONSTRAINT "directory_doctors_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "clinical_departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
