import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminPageHeader } from "@/components/website-admin/admin-page-header";
import { ServiceForm } from "@/components/website-admin/service-form";

export default async function NewServicePage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="mx-auto max-w-3xl space-y-4 md:space-y-6">
      <AdminPageHeader title="New service" backHref="/admin/website/services" />
      <ServiceForm />
    </div>
  );
}
