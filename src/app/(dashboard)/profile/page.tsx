import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { VitalsGrid } from "@/components/patients/vitals-grid";
import { User, Info, Mail, Phone, Stethoscope, FileText } from "lucide-react";

function calculateAge(dob: Date): number {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { role, id } = session.user;

  if (role === "PATIENT") {
    const patient = await db.patientProfile.findUnique({
      where: { userId: id },
      include: { user: { select: { id: true, email: true, createdAt: true } } },
    });

    if (!patient) {
      return <p>Profile not found.</p>;
    }

    const age = calculateAge(new Date(patient.dateOfBirth));

    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Profile header card */}
        <Card className="overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 px-5 py-4 border-b border-border/50">
            <img
              src="/sphlogo.png"
              alt="SPH"
              className="h-8 w-auto"
            />
          </div>
          <CardContent className="pt-5 pb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  {patient.firstName} {patient.lastName}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {patient.gender.charAt(0) + patient.gender.slice(1).toLowerCase()}, {age} years old
                </p>
                <StatusBadge status={patient.status} />
              </div>
              <div className="shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 md:h-10 md:w-10 text-primary/60" />
                </div>
              </div>
            </div>
            <div className="mt-5">
              <Link href={`/patients/${patient.id}`}>
                <Button variant="outline" className="gap-2">
                  <Info className="h-4 w-4" />
                  View my Info
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Vitals section */}
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <h2 className="text-lg font-semibold tracking-tight">My Vitals</h2>
          <VitalsGrid patientId={patient.id} />
        </div>
      </div>
    );
  }

  if (role === "DOCTOR") {
    const doctor = await db.doctorProfile.findUnique({
      where: { userId: id },
      include: { user: { select: { id: true, email: true, createdAt: true } } },
    });

    if (!doctor) {
      return <p>Profile not found.</p>;
    }

    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <Card className="overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 px-5 py-4 border-b border-border/50">
            <img
              src="/sphlogo.png"
              alt="SPH"
              className="h-8 w-auto"
            />
          </div>
          <CardContent className="pt-5 pb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Dr. {doctor.firstName} {doctor.lastName}
                </h1>
                <p className="text-muted-foreground mt-1">{doctor.specialty}</p>
              </div>
              <div className="shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Stethoscope className="h-8 w-8 md:h-10 md:w-10 text-primary/60" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Email</p>
                  <p className="mt-0.5">{doctor.user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Phone</p>
                  <p className="mt-0.5">{doctor.phone}</p>
                </div>
              </div>
              {doctor.licenseNumber && (
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">License #</p>
                    <p className="mt-0.5">{doctor.licenseNumber}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Staff/Admin
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card className="overflow-hidden animate-fade-in">
        <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 px-5 py-4 border-b border-border/50">
          <img
            src="/sphlogo.png"
            alt="SPH"
            className="h-8 w-auto"
          />
        </div>
        <CardContent className="pt-5 pb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight capitalize">
                {role.toLowerCase()}
              </h1>
              <p className="text-muted-foreground mt-1">{session.user.email}</p>
            </div>
            <div className="shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 md:h-10 md:w-10 text-primary/60" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
