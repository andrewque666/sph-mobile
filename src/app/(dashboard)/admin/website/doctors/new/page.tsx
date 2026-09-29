import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/website-admin/admin-page-header";
import { DoctorForm } from "@/components/website-admin/doctor-form";

export default async function NewDirectoryDoctorPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");

  const departments = await db.clinicalDepartment.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } });

  return (
    <div className="mx-auto max-w-3xl space-y-4 md:space-y-6">
      <AdminPageHeader title="Add doctor" backHref="/admin/website/doctors" />
      <DoctorForm departments={departments} />
    </div>
  );
}
