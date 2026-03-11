"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Role, AccountStatus } from "@/lib/types";

type NavLink = {
  href: string;
  label: string;
};

function getNavLinks(role: Role, status?: AccountStatus): NavLink[] {
  const links: NavLink[] = [{ href: "/dashboard", label: "Dashboard" }];

  links.push({ href: "/profile", label: "Profile" });

  if (role === "PATIENT" && status === "APPROVED") {
    links.push({ href: "/doctors", label: "Doctors" });
  }

  if (role === "DOCTOR" || role === "STAFF") {
    links.push({ href: "/patients", label: "Patients" });
    links.push({ href: "/doctors", label: "Doctors" });
  }

  if (role === "ADMIN") {
    links.push({ href: "/patients", label: "Patients" });
    links.push({ href: "/doctors", label: "Doctors" });
    links.push({ href: "/admin/approvals", label: "Approvals" });
    links.push({ href: "/admin/users", label: "Users" });
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
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "block px-3 py-3 md:py-2 rounded-md text-base md:text-sm font-medium transition-colors",
            pathname === link.href || pathname.startsWith(link.href + "/")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
