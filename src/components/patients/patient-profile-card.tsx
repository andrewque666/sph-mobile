import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Mail, Phone, Calendar, MapPin, Droplets, Clock } from "lucide-react";
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
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
          <div className="flex items-start gap-3">
            <Mail className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <dt className="font-medium text-muted-foreground text-xs uppercase tracking-wider">Email</dt>
              <dd className="mt-0.5">{patient.user.email}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <dt className="font-medium text-muted-foreground text-xs uppercase tracking-wider">Phone</dt>
              <dd className="mt-0.5">{patient.phone}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <dt className="font-medium text-muted-foreground text-xs uppercase tracking-wider">Date of Birth</dt>
              <dd className="mt-0.5">{new Date(patient.dateOfBirth).toLocaleDateString()}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0 text-center text-xs font-bold">G</span>
            <div>
              <dt className="font-medium text-muted-foreground text-xs uppercase tracking-wider">Gender</dt>
              <dd className="capitalize mt-0.5">{patient.gender.toLowerCase()}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <dt className="font-medium text-muted-foreground text-xs uppercase tracking-wider">Address</dt>
              <dd className="mt-0.5">{patient.address}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Droplets className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <dt className="font-medium text-muted-foreground text-xs uppercase tracking-wider">Blood Type</dt>
              <dd className="mt-0.5">{patient.bloodType || "Not specified"}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <dt className="font-medium text-muted-foreground text-xs uppercase tracking-wider">Registered</dt>
              <dd className="mt-0.5">{new Date(patient.createdAt).toLocaleDateString()}</dd>
            </div>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
