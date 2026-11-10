import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus, Search } from "lucide-react";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminPageHeader } from "@/components/website-admin/admin-page-header";

export default async function AdminDoctorsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");

  const { q = "" } = await searchParams;
  const term = q.trim();
  const contains = { contains: term, mode: "insensitive" as const };
  const doctors = await db.directoryDoctor.findMany({
    where: term ? { OR: [{ firstName: contains }, { lastName: contains }, { department: { name: contains } }] } : {},
    include: { department: { select: { name: true } } },
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <AdminPageHeader title="Doctor directory" description="Public Find-a-Doctor listings — clinic rooms, hours and local numbers." backHref="/admin/website">
        <Button render={<Link href="/admin/website/doctors/new" />}>
          <Plus /> Add doctor
        </Button>
      </AdminPageHeader>

      <form method="get" role="search" className="flex max-w-md gap-2">
        <label htmlFor="doctor-q" className="sr-only">Search doctors</label>
        <Input id="doctor-q" name="q" defaultValue={q} placeholder="Search by name or department…" />
        <Button type="submit" variant="outline" size="icon" aria-label="Search">
          <Search />
        </Button>
      </form>
      <p className="text-sm text-muted-foreground">{doctors.length} doctors</p>

      <div className="space-y-3 md:hidden">
        {doctors.map((d) => (
          <Link key={d.id} href={`/admin/website/doctors/${d.id}`} className="block">
            <Card size="sm">
              <CardContent className="space-y-1">
                <p className="font-medium">{d.lastName}, {d.firstName}</p>
                <p className="text-xs text-muted-foreground">
                  {d.department.name}{d.room ? ` · ${d.room}` : ""}{d.published ? "" : " · Hidden"}
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
              <TableHead>Department</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Clinic hours</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map((d) => (
              <TableRow key={d.id}>
                <TableCell>
                  <Link href={`/admin/website/doctors/${d.id}`} className="font-medium hover:text-primary hover:underline">
                    {d.lastName}, {d.firstName}
                  </Link>
                </TableCell>
                <TableCell>{d.department.name}</TableCell>
                <TableCell>{d.room ?? "—"}</TableCell>
                <TableCell className="max-w-xs truncate">{d.schedule ?? "—"}</TableCell>
                <TableCell>
                  <Badge variant={d.published ? "secondary" : "outline"}>{d.published ? "Published" : "Hidden"}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
