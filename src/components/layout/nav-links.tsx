"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Users,
  Stethoscope,
  ClipboardCheck,
  UserCog,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Role, AccountStatus } from "@/lib/types";
import type { LucideIcon } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

function getNavLinks(role: Role, status?: AccountStatus): NavLink[] {
  const links: NavLink[] = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/profile", label: "Profile", icon: User },
  ];

  if (role === "PATIENT" && status === "APPROVED") {
    links.push({ href: "/doctors", label: "Doctors", icon: Stethoscope });
  }

  if (role === "DOCTOR" || role === "STAFF") {
    links.push({ href: "/patients", label: "Patients", icon: Users });
    links.push({ href: "/doctors", label: "Doctors", icon: Stethoscope });
  }

  if (role === "ADMIN") {
    links.push({ href: "/patients", label: "Patients", icon: Users });
    links.push({ href: "/doctors", label: "Doctors", icon: Stethoscope });
    links.push({ href: "/admin/approvals", label: "Approvals", icon: ClipboardCheck });
    links.push({ href: "/admin/users", label: "Users", icon: UserCog });
  }

  return links;
}

export function NavLinks({
  role,
  status,
}: {
  role: Role;
  status?: AccountStatus;
}) {
  const pathname = usePathname();
  const links = getNavLinks(role, status);

  return (
    <nav className="space-y-1">
      {links.map((link) => {
        const Icon = link.icon;
        const active =
          pathname === link.href || pathname.startsWith(link.href + "/");

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
