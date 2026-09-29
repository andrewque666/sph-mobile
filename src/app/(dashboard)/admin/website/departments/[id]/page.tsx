import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/website-admin/admin-page-header";
import { DeleteButton } from "@/components/website-admin/delete-button";
import { DepartmentForm } from "@/components/website-admin/department-form";

export default async function EditDepartmentPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");

  const { id } = await params;
  const d = await db.clinicalDepartment.findUnique({ where: { id } });
  if (!d) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-4 md:space-y-6">
      <AdminPageHeader
        title="Edit department"
        description="A department that still has doctors cannot be deleted — move or remove its doctors first."
        backHref="/admin/website/departments"
      >
        <DeleteButton url={`/api/website/departments/${d.id}`} label="Department" backTo="/admin/website/departments" />
      </AdminPageHeader>
      <DepartmentForm
        id={d.id}
        defaults={{
          name: d.name,
          slug: d.slug,
          description: d.description,
          chairman: d.chairman ?? "",
          hasResidency: d.hasResidency,
          facebookUrl: d.facebookUrl ?? "",
          sortOrder: d.sortOrder,
          published: d.published,
        }}
      />
    </div>
  );
}
