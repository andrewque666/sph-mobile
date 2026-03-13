-- CreateEnum
CREATE TYPE "VitalType" AS ENUM ('WEIGHT', 'BLOOD_PRESSURE', 'TEMPERATURE', 'PULSE');

-- CreateTable
CREATE TABLE "vital_signs" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "type" "VitalType" NOT NULL,
    "value" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vital_signs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "vital_signs_patientId_type_takenAt_idx" ON "vital_signs"("patientId", "type", "takenAt" DESC);

-- AddForeignKey
ALTER TABLE "vital_signs" ADD CONSTRAINT "vital_signs_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
