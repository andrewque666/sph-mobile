import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { ApprovalActions } from "./approval-actions";
import type { AccountStatus, Gender } from "@/lib/types";

type PatientRow = {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  phone: string;
  status: AccountStatus;
  createdAt: string | Date;
  user: {
    id: string;
    email: string;
    createdAt: string | Date;
  };
};

export function PatientListTable({
  patients,
  showActions = false,
}: {
  patients: PatientRow[];
  showActions?: boolean;
}) {
  if (patients.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No patients found
      </p>
    );
  }

  return (
    <>
      {/* Mobile: card layout */}
      <div className="space-y-3 md:hidden">
        {patients.map((p) => (
          <Card key={p.id}>
            <CardContent className="pt-4 pb-4 space-y-3">
              <div className="flex items-center justify-between">
                <Link
                  href={`/patients/${p.id}`}
                  className="text-primary font-medium hover:underline"
                >
                  {p.firstName} {p.lastName}
                </Link>
                <StatusBadge status={p.status} />
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>{p.user.email}</p>
                <p>{p.phone}</p>
                <p>{new Date(p.createdAt).toLocaleDateString()}</p>
              </div>
              {showActions && p.status === "PENDING" && (
                <ApprovalActions patientId={p.id} />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop: table layout */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Registered</TableHead>
              {showActions && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <Link
                    href={`/patients/${p.id}`}
                    className="text-primary hover:underline"
                  >
                    {p.firstName} {p.lastName}
                  </Link>
                </TableCell>
                <TableCell>{p.user.email}</TableCell>
                <TableCell>{p.phone}</TableCell>
                <TableCell>
                  <StatusBadge status={p.status} />
                </TableCell>
                <TableCell>
                  {new Date(p.createdAt).toLocaleDateString()}
                </TableCell>
                {showActions && (
                  <TableCell>
                    {p.status === "PENDING" && (
                      <ApprovalActions patientId={p.id} />
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
