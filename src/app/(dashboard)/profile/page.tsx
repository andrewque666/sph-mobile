import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { PatientProfileCard } from "@/components/patients/patient-profile-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">My Profile</h2>
        <PatientProfileCard patient={patient} />
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
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">My Profile</h2>
        <Card>
          <CardHeader>
            <CardTitle>
              Dr. {doctor.firstName} {doctor.lastName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="font-medium text-muted-foreground">Email</dt>
                <dd>{doctor.user.email}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Specialty</dt>
                <dd>{doctor.specialty}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Phone</dt>
                <dd>{doctor.phone}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">License #</dt>
                <dd>{doctor.licenseNumber || "N/A"}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Staff/Admin — simple profile
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Profile</h2>
      <Card>
        <CardContent className="pt-6">
          <dl className="text-sm space-y-2">
            <div>
              <dt className="font-medium text-muted-foreground">Email</dt>
              <dd>{session.user.email}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Role</dt>
              <dd className="capitalize">{role.toLowerCase()}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
