import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  return (
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
        {patients.length === 0 ? (
          <TableRow>
            <TableCell colSpan={showActions ? 6 : 5} className="text-center text-muted-foreground">
              No patients found
            </TableCell>
          </TableRow>
        ) : (
          patients.map((p) => (
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
          ))
        )}
      </TableBody>
    </Table>
  );
}
