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
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-sidebar text-sidebar-foreground">
      <div className="flex items-center h-16 px-5 border-b border-sidebar-border shrink-0">
        <img
          src="/sphlogo.png"
          alt="SPH"
          className="h-7 w-auto rounded bg-white/90 px-1.5 py-0.5"
        />
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto px-3 py-4">
        <NavLinks role={role} status={status} />
      </div>
      <div className="px-5 py-4 border-t border-sidebar-border">
        <p className="text-[11px] text-sidebar-foreground/40 leading-relaxed">
          St. Paul&apos;s Hospital<br />of Iloilo, Inc.
        </p>
      </div>
    </aside>
  );
}
