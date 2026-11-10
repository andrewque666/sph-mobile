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

export default async function AdminDepartmentsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");

  const departments = await db.clinicalDepartment.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { _count: { select: { directoryDoctors: true } } },
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <AdminPageHeader title="Clinical departments" description="Shown on /departments and used to group the doctor directory." backHref="/admin/website">
        <Button render={<Link href="/admin/website/departments/new" />}>
          <Plus /> New department
        </Button>
      </AdminPageHeader>

      <div className="space-y-3 md:hidden">
        {departments.map((d) => (
          <Link key={d.id} href={`/admin/website/departments/${d.id}`} className="block">
            <Card>
              <CardContent className="space-y-1.5">
                <p className="font-medium">{d.name}</p>
                <p className="text-xs text-muted-foreground">
                  {d._count.directoryDoctors} doctors{d.hasResidency ? " · Residency" : ""}{d.published ? "" : " · Draft"}
                </p>
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
              <TableHead>Chairman</TableHead>
              <TableHead>Doctors</TableHead>
              <TableHead>Residency</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((d) => (
              <TableRow key={d.id}>
                <TableCell>
                  <Link href={`/admin/website/departments/${d.id}`} className="font-medium hover:text-primary hover:underline">
                    {d.name}
                  </Link>
                </TableCell>
                <TableCell>{d.chairman ?? "—"}</TableCell>
                <TableCell>{d._count.directoryDoctors}</TableCell>
                <TableCell>{d.hasResidency ? "Yes" : "—"}</TableCell>
                <TableCell>
                  <Badge variant={d.published ? "secondary" : "outline"}>{d.published ? "Published" : "Draft"}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
