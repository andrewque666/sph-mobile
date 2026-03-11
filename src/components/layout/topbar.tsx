"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import type { Role } from "@/lib/types";

export function Topbar({ email, role }: { email: string; role: Role }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-primary text-primary-foreground flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold">SPH Hospital</h1>
        <span className="text-xs bg-white/20 text-primary-foreground px-2 py-1 rounded-full capitalize">
          {role.toLowerCase()}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-primary-foreground/80 hidden sm:inline">{email}</span>
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
