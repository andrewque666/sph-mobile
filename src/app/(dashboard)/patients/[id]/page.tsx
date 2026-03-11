import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PatientProfileCard } from "@/components/patients/patient-profile-card";

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { id } = await params;

  const patient = await db.patientProfile.findUnique({
    where: { id },
    include: { user: { select: { id: true, email: true, createdAt: true } } },
  });

  if (!patient) notFound();

  // Patients can only view their own profile
  if (session.user.role === "PATIENT" && patient.userId !== session.user.id) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Patient Details</h2>
      <PatientProfileCard patient={patient} />
    </div>
  );
}
