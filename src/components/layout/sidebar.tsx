"use client";

import { NavLinks } from "./nav-links";
import type { Role, AccountStatus } from "@/lib/types";

export function Sidebar({
  role,
  status,
}: {
  role: Role;
  status?: AccountStatus;
}) {
  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r bg-card">
      <div className="flex-1 flex flex-col min-h-0 pt-16">
        <div className="flex-1 flex flex-col overflow-y-auto p-4">
          <NavLinks role={role} status={status} />
        </div>
      </div>
    </aside>
  );
}
