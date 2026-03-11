import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { PatientListTable } from "@/components/patients/patient-list-table";

export default async function PatientsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  if (session.user.role === "PATIENT") redirect("/dashboard");

  const patients = await db.patientProfile.findMany({
    include: { user: { select: { id: true, email: true, createdAt: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Patients</h2>
      <PatientListTable
        patients={patients}
        showActions={session.user.role === "ADMIN"}
      />
    </div>
  );
}
