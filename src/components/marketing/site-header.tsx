"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Phone,
  Siren,
  Search,
  ChevronDown,
  CalendarCheck,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { NAV, SITE, type NavGroup } from "@/components/marketing/site-data";

function isActive(pathname: string, group: NavGroup) {
  const hrefs = [group.href, ...(group.items ?? []).map((i) => i.href)];
  return hrefs.some((h) => pathname === h || pathname.startsWith(`${h}/`));
}

/**
 * Public site header: utility bar (hotline, results, careers), primary nav with
 * grouped menus, site search and the appointment CTA. SSO-aware — signed-in
 * visitors get a shortcut to their dashboard instead of "Sign in".
 */
export function SiteHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40">
      {/* Utility bar */}
      <div className="bg-sidebar text-sidebar-foreground">
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-between gap-4 px-4 text-xs sm:px-6">
          <a href={SITE.contact.phoneHref} className="inline-flex items-center gap-1.5 font-medium hover:underline">
            <Siren className="size-3.5 text-sidebar-primary" aria-hidden />
            <span className="hidden sm:inline">24/7 Emergency &amp; hotline:</span>
            <span>{SITE.contact.phone}</span>
          </a>
          <nav aria-label="Quick links" className="hidden items-center gap-4 text-sidebar-foreground/80 md:flex">
            <Link href="/results" className="hover:text-sidebar-foreground">Online results</Link>
            <Link href="/careers" className="hover:text-sidebar-foreground">Careers</Link>
            <Link href="/patients-and-visitors#visiting-hours" className="hover:text-sidebar-foreground">Visiting hours</Link>
            {isLoggedIn ? (
              <Link href="/dashboard" className="hover:text-sidebar-foreground">My dashboard</Link>
            ) : (
              <Link href="/login" className="hover:text-sidebar-foreground">e-Patient sign in</Link>
            )}
          </nav>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" onClick={close}>
            <span className="rounded bg-white/90 px-1.5 py-0.5 ring-1 ring-border">
              <img src="/sphlogo.png" alt={SITE.name} className="h-8 w-auto" />
            </span>
            <span className="hidden flex-col leading-tight xl:flex">
              <span className="text-sm font-semibold">{SITE.name}</span>
              <span className="text-[11px] text-muted-foreground">Sisters of St. Paul of Chartres</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV.map((group) =>
              group.items ? (
                <DropdownMenu key={group.label}>
                  <DropdownMenuTrigger
                    openOnHover
                    className={cn(
                      "inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:bg-muted",
                      isActive(pathname, group) ? "text-primary" : "text-foreground/80"
                    )}
                  >
                    {group.label}
                    <ChevronDown className="size-3.5 opacity-60" aria-hidden />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 p-1.5">
                    {group.items.map((item) => (
                      <DropdownMenuItem
                        key={item.href}
                        render={<Link href={item.href} />}
                        className="flex-col items-start gap-0.5 px-2.5 py-2"
                      >
                        <span className="font-medium">{item.label}</span>
                        {item.description && (
                          <span className="text-xs text-muted-foreground">{item.description}</span>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={group.href}
                  href={group.href}
                  aria-current={isActive(pathname, group) ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:bg-muted",
                    isActive(pathname, group) ? "text-primary" : "text-foreground/80"
                  )}
                >
                  {group.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="icon-lg" aria-label="Search the site" render={<Link href="/search" onClick={close} />}>
              <Search />
            </Button>
            <Button className="hidden sm:inline-flex" render={<Link href="/appointments" />}>
              <CalendarCheck /> Request appointment
            </Button>
            {isLoggedIn && (
              <Button variant="outline" size="icon-lg" className="hidden lg:inline-flex" aria-label="Go to dashboard" render={<Link href="/dashboard" />}>
                <LayoutDashboard />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon-lg"
              className="lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div id="mobile-menu" className="max-h-[calc(100dvh-6.25rem)] overflow-y-auto border-t border-border bg-background lg:hidden">
            <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6">
              <div className="grid grid-cols-2 gap-2">
                <Button render={<Link href="/appointments" onClick={close} />}>
                  <CalendarCheck /> Appointment
                </Button>
                <Button variant="outline" render={<Link href="/results" onClick={close} />}>
                  <FileText /> Results
                </Button>
              </div>

              {NAV.map((group) => (
                <div key={group.label} className="space-y-1">
                  {group.items ? (
                    <>
                      <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {group.label}
                      </p>
                      {group.items.map((item) => (
                        <MobileLink key={item.href} href={item.href} pathname={pathname} onClick={close}>
                          {item.label}
                        </MobileLink>
                      ))}
                    </>
                  ) : (
                    <MobileLink href={group.href} pathname={pathname} onClick={close}>
                      {group.label}
                    </MobileLink>
                  )}
                </div>
              ))}

              <div className="space-y-1 border-t border-border pt-4">
                <MobileLink href="/careers" pathname={pathname} onClick={close}>Careers</MobileLink>
                <MobileLink href={isLoggedIn ? "/dashboard" : "/login"} pathname={pathname} onClick={close}>
                  {isLoggedIn ? "My dashboard" : "e-Patient sign in"}
                </MobileLink>
                <a href={SITE.contact.phoneHref} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-primary">
                  <Phone className="size-4" /> Call {SITE.contact.phone}
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function MobileLink({
  href,
  pathname,
  onClick,
  children,
}: {
  href: string;
  pathname: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "block rounded-lg px-3 py-2 text-sm font-medium",
        active ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-muted"
      )}
    >
      {children}
    </Link>
  );
}
