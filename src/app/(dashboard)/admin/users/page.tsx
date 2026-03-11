import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function UsersPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");

  const users = await db.user.findMany({
    include: {
      doctorProfile: {
        select: { firstName: true, lastName: true, specialty: true },
      },
      patientProfile: {
        select: { firstName: true, lastName: true, status: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold">Users</h2>
        <Link href="/admin/users/new">
          <Button>Create User</Button>
        </Link>
      </div>

      {/* Mobile: card layout */}
      <div className="space-y-3 md:hidden">
        {users.map((user) => {
          const name = user.doctorProfile
            ? `Dr. ${user.doctorProfile.firstName} ${user.doctorProfile.lastName}`
            : user.patientProfile
              ? `${user.patientProfile.firstName} ${user.patientProfile.lastName}`
              : "-";

          return (
            <Card key={user.id}>
              <CardContent className="pt-4 pb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{name}</span>
                  <Badge variant="secondary" className="capitalize">
                    {user.role.toLowerCase()}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Desktop: table layout */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              const name = user.doctorProfile
                ? `Dr. ${user.doctorProfile.firstName} ${user.doctorProfile.lastName}`
                : user.patientProfile
                  ? `${user.patientProfile.firstName} ${user.patientProfile.lastName}`
                  : "-";

              return (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {user.role.toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
