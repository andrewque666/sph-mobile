"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import type { Role, AccountStatus } from "@/lib/types";

export function Topbar({
  email,
  role,
  status,
}: {
  email: string;
  role: Role;
  status?: AccountStatus;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-primary text-primary-foreground flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <MobileNav role={role} status={status} />
        <Image src="/sphlogo.png" alt="SPH" width={144} height={30} className="h-8 w-auto" />
        <span className="text-xs bg-white/20 text-primary-foreground px-2 py-1 rounded-full capitalize">
          {role.toLowerCase()}
        </span>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <span className="text-sm text-primary-foreground/80 hidden sm:inline">
          {email}
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Sign Out
        </Button>
      </div>
    </header>
  );
}
