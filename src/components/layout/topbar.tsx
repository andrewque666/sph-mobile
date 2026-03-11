"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { LogOut } from "lucide-react";
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
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-primary text-primary-foreground flex items-center justify-between px-4 md:px-6 shadow-md">
      <div className="flex items-center gap-3">
        <MobileNav role={role} status={status} />
        <Image
          src="/sphlogo.png"
          alt="SPH"
          width={144}
          height={30}
          className="h-7 w-auto brightness-0 invert"
        />
        <span className="hidden sm:inline-flex text-[11px] font-medium tracking-wide uppercase bg-white/15 backdrop-blur-sm text-primary-foreground/90 px-2.5 py-1 rounded-full">
          {role.toLowerCase()}
        </span>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <span className="text-sm text-primary-foreground/70 hidden sm:inline truncate max-w-48">
          {email}
        </span>
        <Button
          variant="secondary"
          size="sm"
          className="gap-1.5"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    </header>
  );
}
