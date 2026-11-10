import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

/** Interior-page header: breadcrumbs, eyebrow, H1, lead text and optional actions. */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs = [],
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary/50">
      <div aria-hidden className="absolute -right-24 -top-24 size-72 rounded-full bg-primary/5" />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">Home</Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1">
                <ChevronRight className="size-3" aria-hidden />
                {c.href ? (
                  <Link href={c.href} className="hover:text-foreground">{c.label}</Link>
                ) : (
                  <span aria-current="page" className="text-foreground">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
        )}
        <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-balance sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base text-pretty text-muted-foreground">{description}</p>
        )}
        {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
