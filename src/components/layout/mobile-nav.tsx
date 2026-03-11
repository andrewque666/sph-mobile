"use client";

import { useState } from "react";
import { NavLinks } from "./nav-links";
import type { Role, AccountStatus } from "@/lib/types";

export function MobileNav({
  role,
  status,
}: {
  role: Role;
  status?: AccountStatus;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex flex-col gap-1.5 p-2 -ml-2"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`}
        />
        <span
          className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`}
        />
        <span
          className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 bottom-0 z-50 bg-sidebar text-sidebar-foreground p-4 overflow-y-auto md:hidden animate-slide-in-left">
            <div onClick={() => setOpen(false)}>
              <NavLinks role={role} status={status} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
