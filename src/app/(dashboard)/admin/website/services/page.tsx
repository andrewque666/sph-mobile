import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminPageHeader } from "@/components/website-admin/admin-page-header";
import { SERVICE_GROUP_LABELS } from "@/components/marketing/site-data";

export default async function AdminServicesPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");

  const services = await db.serviceCenter.findMany({ orderBy: [{ group: "asc" }, { sortOrder: "asc" }, { name: "asc" }] });

  return (
    <div className="space-y-4 md:space-y-6">
      <AdminPageHeader title="Services & centers" description="Shown on /services, the home page and each service detail page." backHref="/admin/website">
        <Button render={<Link href="/admin/website/services/new" />}>
          <Plus /> New service
        </Button>
      </AdminPageHeader>

      <div className="space-y-3 md:hidden">
        {services.map((s) => (
          <Link key={s.id} href={`/admin/website/services/${s.id}`} className="block">
            <Card>
              <CardContent className="space-y-1.5">
                <p className="font-medium">{s.name}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{SERVICE_GROUP_LABELS[s.group].label}</Badge>
                  {!s.published && <Badge variant="outline">Draft</Badge>}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((s) => (
              <TableRow key={s.id}>
                <TableCell>
                  <Link href={`/admin/website/services/${s.id}`} className="font-medium hover:text-primary hover:underline">
                    {s.name}
                  </Link>
                </TableCell>
                <TableCell>{SERVICE_GROUP_LABELS[s.group].label}</TableCell>
                <TableCell>{s.sortOrder}</TableCell>
                <TableCell>
                  <Badge variant={s.published ? "secondary" : "outline"}>{s.published ? "Published" : "Draft"}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {services.length === 0 && <p className="py-8 text-center text-muted-foreground">No services yet.</p>}
    </div>
  );
}
