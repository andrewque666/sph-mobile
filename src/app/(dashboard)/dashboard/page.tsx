import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Stethoscope, Shield, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import Link from "next/link";
import { PatientQrCard } from "@/components/patients/patient-qr-card";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { role, status } = session.user;

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

  let patientProfile = null;
  if (role === "PATIENT") {
    patientProfile = await db.patientProfile.findUnique({
      where: { userId: session.user.id },
      select: { id: true, firstName: true, lastName: true },
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {role === "ADMIN" && "Hospital overview and management"}
          {role === "DOCTOR" && "Welcome back, Doctor"}
          {role === "STAFF" && "Welcome back, Staff member"}
          {role === "PATIENT" && "Your patient portal"}
        </p>
      </div>

      {role === "PATIENT" && status === "PENDING" && (
        <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-yellow-50/50 animate-fade-in">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-yellow-100 shrink-0">
                <Clock className="h-4 w-4 text-yellow-700" />
              </div>
              <div>
                <p className="font-medium text-yellow-900 text-sm">Account Pending Review</p>
                <p className="text-sm text-yellow-700 mt-0.5">
                  Your account is pending admin approval. Some features are restricted until your account is approved.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {role === "PATIENT" && status === "REJECTED" && (
        <Card className="border-red-200 bg-gradient-to-r from-red-50 to-red-50/50 animate-fade-in">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-100 shrink-0">
                <AlertTriangle className="h-4 w-4 text-red-700" />
              </div>
              <div>
                <p className="font-medium text-red-900 text-sm">Registration Rejected</p>
                <p className="text-sm text-red-700 mt-0.5">
                  Your registration has been rejected. Please contact the hospital for more information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {role === "PATIENT" && status === "APPROVED" && (
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent animate-fade-in">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 shrink-0">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Account Approved</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Welcome! Your account is approved. You have full access to patient features.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {role === "PATIENT" && patientProfile && (
        <PatientQrCard
          patientId={patientProfile.id}
          patientName={`${patientProfile.firstName} ${patientProfile.lastName}`}
        />
      )}

      {(role === "DOCTOR" || role === "STAFF") && (
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent animate-fade-in">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 shrink-0">
                <Info className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Use the sidebar to view patients, browse the doctor directory, and manage your profile.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {role === "ADMIN" && stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <Card className="animate-slide-up group hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Patients
              </CardTitle>
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tracking-tight">{stats.totalPatients}</p>
            </CardContent>
          </Card>

          <Link href="/admin/approvals">
            <Card className="animate-slide-up group hover:shadow-md hover:border-yellow-300 transition-all cursor-pointer" style={{ animationDelay: "75ms" }}>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending
                </CardTitle>
                <div className="p-2 rounded-lg bg-yellow-100 text-yellow-700 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                  <Clock className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold tracking-tight text-yellow-600">
                  {stats.pendingPatients}
                </p>
              </CardContent>
            </Card>
          </Link>

          <Card className="animate-slide-up group hover:shadow-md transition-shadow" style={{ animationDelay: "150ms" }}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Doctors
              </CardTitle>
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Stethoscope className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tracking-tight">{stats.totalDoctors}</p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up group hover:shadow-md transition-shadow" style={{ animationDelay: "225ms" }}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Staff
              </CardTitle>
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Shield className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tracking-tight">{stats.totalStaff}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
