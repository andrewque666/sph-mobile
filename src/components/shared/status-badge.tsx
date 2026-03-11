import { Badge } from "@/components/ui/badge";
import type { AccountStatus } from "@/lib/types";

const statusStyles: Record<AccountStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
  APPROVED: "bg-green-100 text-green-800 border-green-300",
  REJECTED: "bg-red-100 text-red-800 border-red-300",
};

export function StatusBadge({ status }: { status: AccountStatus }) {
  return (
    <Badge variant="outline" className={statusStyles[status]}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </Badge>
  );
}
