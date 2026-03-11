import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, FileText } from "lucide-react";

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
    <Card className="group hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base">
              Dr. {doctor.firstName} {doctor.lastName}
            </CardTitle>
          </div>
          <Badge variant="secondary" className="shrink-0">{doctor.specialty}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-2.5">
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{doctor.user.email}</span>
          </div>
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Phone className="h-3.5 w-3.5 shrink-0" />
            <span>{doctor.phone}</span>
          </div>
          {doctor.licenseNumber && (
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <FileText className="h-3.5 w-3.5 shrink-0" />
              <span>{doctor.licenseNumber}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
