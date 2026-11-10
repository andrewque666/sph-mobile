import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ExternalLink } from "lucide-react";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { AdminPageHeader } from "@/components/website-admin/admin-page-header";
import { DeleteButton } from "@/components/website-admin/delete-button";
import { ServiceForm } from "@/components/website-admin/service-form";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");

  const { id } = await params;
  const s = await db.serviceCenter.findUnique({ where: { id } });
  if (!s) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-4 md:space-y-6">
      <AdminPageHeader title="Edit service" backHref="/admin/website/services">
        {s.published && (
          <Button variant="outline" render={<Link href={`/services/${s.slug}`} target="_blank" />}>
            <ExternalLink /> View
          </Button>
        )}
        <DeleteButton url={`/api/website/services/${s.id}`} label="Service" backTo="/admin/website/services" />
      </AdminPageHeader>
      <ServiceForm
        id={s.id}
        defaults={{
          name: s.name,
          slug: s.slug,
          shortName: s.shortName ?? "",
          group: s.group,
          tagline: s.tagline ?? "",
          summary: s.summary,
          body: s.body,
          offerings: s.offerings.join("\n"),
          schedule: s.schedule ?? "",
          phone: s.phone ?? "",
          location: s.location ?? "",
          sortOrder: s.sortOrder,
          published: s.published,
        }}
      />
    </div>
  );
}
