import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import type { AccountStatus, Gender } from "@/lib/types";

type PatientProfileData = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string | Date;
  gender: Gender;
  phone: string;
  address: string;
  bloodType: string | null;
  status: AccountStatus;
  createdAt: string | Date;
  user: {
    id: string;
    email: string;
    createdAt: string | Date;
  };
};

export function PatientProfileCard({
  patient,
}: {
  patient: PatientProfileData;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {patient.firstName} {patient.lastName}
          </CardTitle>
          <StatusBadge status={patient.status} />
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="font-medium text-muted-foreground">Email</dt>
            <dd>{patient.user.email}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">Phone</dt>
            <dd>{patient.phone}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">Date of Birth</dt>
            <dd>{new Date(patient.dateOfBirth).toLocaleDateString()}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">Gender</dt>
            <dd className="capitalize">{patient.gender.toLowerCase()}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">Address</dt>
            <dd>{patient.address}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">Blood Type</dt>
            <dd>{patient.bloodType || "Not specified"}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted-foreground">Registered</dt>
            <dd>{new Date(patient.createdAt).toLocaleDateString()}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
