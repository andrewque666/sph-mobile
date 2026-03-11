import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { PatientListTable } from "@/components/patients/patient-list-table";

export default async function ApprovalsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");

  const pendingPatients = await db.patientProfile.findMany({
    where: { status: "PENDING" },
    include: { user: { select: { id: true, email: true, createdAt: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-bold">Pending Approvals</h2>
      <PatientListTable patients={pendingPatients} showActions />
    </div>
  );
}
