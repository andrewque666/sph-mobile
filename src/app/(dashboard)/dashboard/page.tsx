import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { role, status } = session.user;

  // Admin stats
  let stats = null;
  if (role === "ADMIN") {
    const [totalPatients, pendingPatients, totalDoctors, totalStaff] =
      await Promise.all([
        db.patientProfile.count(),
        db.patientProfile.count({ where: { status: "PENDING" } }),
        db.user.count({ where: { role: "DOCTOR" } }),
        db.user.count({ where: { role: "STAFF" } }),
      ]);
    stats = { totalPatients, pendingPatients, totalDoctors, totalStaff };
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      {role === "PATIENT" && status === "PENDING" && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                Pending
              </Badge>
              <p className="text-sm">
                Your account is pending admin approval. Some features are restricted until your account is approved.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {role === "PATIENT" && status === "REJECTED" && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-sm text-red-800">
              Your registration has been rejected. Please contact the hospital for more information.
            </p>
          </CardContent>
        </Card>
      )}

      {role === "PATIENT" && status === "APPROVED" && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-green-700">
              Welcome! Your account is approved. You have full access to patient features.
            </p>
          </CardContent>
        </Card>
      )}

      {role === "DOCTOR" && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm">Welcome, Doctor! Use the sidebar to view patients and manage your profile.</p>
          </CardContent>
        </Card>
      )}

      {role === "STAFF" && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm">Welcome, Staff member! Use the sidebar to manage patients and doctors.</p>
          </CardContent>
        </Card>
      )}

      {role === "ADMIN" && stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalPatients}</p>
            </CardContent>
          </Card>
          <Link href="/admin/approvals">
            <Card className="hover:border-yellow-400 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Approvals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-yellow-600">
                  {stats.pendingPatients}
                </p>
              </CardContent>
            </Card>
          </Link>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Doctors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalDoctors}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Staff
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalStaff}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
