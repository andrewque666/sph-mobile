import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type DoctorData = {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  phone: string;
  licenseNumber: string | null;
  user: {
    id: string;
    email: string;
  };
};

export function DoctorCard({ doctor }: { doctor: DoctorData }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            Dr. {doctor.firstName} {doctor.lastName}
          </CardTitle>
          <Badge variant="secondary">{doctor.specialty}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="text-sm space-y-1">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Email</dt>
            <dd>{doctor.user.email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Phone</dt>
            <dd>{doctor.phone}</dd>
          </div>
          {doctor.licenseNumber && (
            <div className="flex justify-between">
              <dt className="text-muted-foreground">License</dt>
              <dd>{doctor.licenseNumber}</dd>
            </div>
          )}
        </dl>
      </CardContent>
    </Card>
  );
}
