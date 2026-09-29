import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Music2,
  type LucideIcon,
} from "lucide-react";
import { SITE, NAV, FOOTER_LINKS } from "@/components/marketing/site-data";

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  Facebook,
  Messenger: MessageCircle,
  Instagram,
  YouTube: Youtube,
  TikTok: Music2,
};

export function SiteFooter() {
  const groups = NAV.filter((g) => g.items);

  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div className="space-y-4">
          <span className="inline-block w-fit rounded bg-white/90 px-1.5 py-0.5">
            <img src="/sphlogo.png" alt={SITE.name} className="h-8 w-auto" />
          </span>
          <p className="text-sm leading-relaxed text-sidebar-foreground/70">{SITE.description}</p>
          <p className="text-sm italic text-sidebar-foreground/80">{SITE.motto}</p>
          <ul className="flex flex-wrap gap-2" aria-label="Social media">
            {SITE.social.map((s) => {
              const Icon = SOCIAL_ICONS[s.label];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${SITE.shortName} on ${s.label}`}
                    className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-sidebar-primary"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {groups.map((group) => (
          <nav key={group.label} aria-label={group.label} className="space-y-3 text-sm">
            <p className="font-semibold">{group.label}</p>
            <ul className="space-y-2">
              {group.items!.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sidebar-foreground/70 hover:text-sidebar-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
              {group.label === "Services" &&
                FOOTER_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sidebar-foreground/70 hover:text-sidebar-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        ))}

        <address className="space-y-3 text-sm not-italic">
          <p className="font-semibold">Contact us</p>
          <p className="flex items-start gap-2 text-sidebar-foreground/70">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden /> {SITE.contact.address}
          </p>
          <a href={SITE.contact.phoneHref} className="flex items-center gap-2 text-sidebar-foreground/70 hover:text-sidebar-foreground">
            <Phone className="size-4 shrink-0" aria-hidden /> {SITE.contact.phone}
          </a>
          <a href={`mailto:${SITE.contact.email}`} className="flex items-center gap-2 text-sidebar-foreground/70 hover:text-sidebar-foreground">
            <Mail className="size-4 shrink-0" aria-hidden /> {SITE.contact.email}
          </a>
          <p className="flex items-start gap-2 text-sidebar-foreground/70">
            <Clock className="mt-0.5 size-4 shrink-0" aria-hidden /> {SITE.contact.hours}
          </p>
        </address>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-sidebar-foreground/60 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {SITE.legalName} All rights reserved.</p>
          <p>
            <Link href="/contact" className="hover:text-sidebar-foreground">Contact</Link>
            {" · "}
            <Link href="/search" className="hover:text-sidebar-foreground">Search</Link>
            {" · "}
            <Link href="/careers" className="hover:text-sidebar-foreground">Careers</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
