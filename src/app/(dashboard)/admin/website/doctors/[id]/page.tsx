import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/website-admin/admin-page-header";
import { DeleteButton } from "@/components/website-admin/delete-button";
import { DoctorForm } from "@/components/website-admin/doctor-form";

export default async function EditDirectoryDoctorPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");

  const { id } = await params;
  const [d, departments] = await Promise.all([
    db.directoryDoctor.findUnique({ where: { id } }),
    db.clinicalDepartment.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
  ]);
  if (!d) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-4 md:space-y-6">
      <AdminPageHeader title="Edit doctor" backHref="/admin/website/doctors">
        <DeleteButton url={`/api/website/doctors/${d.id}`} label="Doctor" backTo="/admin/website/doctors" />
      </AdminPageHeader>
      <DoctorForm
        id={d.id}
        departments={departments}
        defaults={{
          firstName: d.firstName,
          lastName: d.lastName,
          departmentId: d.departmentId,
          specialty: d.specialty ?? "",
          room: d.room ?? "",
          schedule: d.schedule ?? "",
          local: d.local ?? "",
          phone: d.phone ?? "",
          published: d.published,
        }}
      />
    </div>
  );
}
