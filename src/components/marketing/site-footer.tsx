import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Facebook, Youtube, MessageCircle } from "lucide-react";
import { SITE, NAV_LINKS } from "@/components/marketing/site-data";

export function SiteFooter() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <span className="inline-block w-fit rounded bg-white/90 px-1.5 py-0.5">
            <img src="/sphlogo.png" alt={SITE.name} className="h-7 w-auto" />
          </span>
          <p className="text-xs leading-relaxed text-sidebar-foreground/70">{SITE.description}</p>
          <div className="flex gap-2 pt-1">
            {[Facebook, MessageCircle, Youtube].map((Icon, i) => (
              <span key={i} className="flex size-8 items-center justify-center rounded-full bg-white/10">
                <Icon className="size-4" />
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-semibold">Explore</p>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="block text-sidebar-foreground/70 hover:text-sidebar-foreground">
              {l.label}
            </Link>
          ))}
          <Link href="/register" className="block text-sidebar-foreground/70 hover:text-sidebar-foreground">
            e-Patient Portal
          </Link>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-semibold">Contact</p>
          <p className="flex items-start gap-2 text-sidebar-foreground/70">
            <MapPin className="mt-0.5 size-4 shrink-0" /> {SITE.contact.address}
          </p>
          <p className="flex items-center gap-2 text-sidebar-foreground/70">
            <Phone className="size-4" /> {SITE.contact.phone}
          </p>
          <p className="flex items-center gap-2 text-sidebar-foreground/70">
            <Mail className="size-4" /> {SITE.contact.email}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-semibold">Hours</p>
          <p className="flex items-start gap-2 text-sidebar-foreground/70">
            <Clock className="mt-0.5 size-4 shrink-0" /> {SITE.contact.hours}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-6 py-4 text-center text-xs text-sidebar-foreground/50">
          © {new Date().getFullYear()} {SITE.name}, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
