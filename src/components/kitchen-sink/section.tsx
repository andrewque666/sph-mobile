import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  title: string;
  description?: string;
  /** Optional eyebrow label shown above the title. */
  eyebrow?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Consistent wrapper for every block in the kitchen-sink showcase:
 * an anchor target, a titled header, a divider, and a content area.
 */
export function Section({
  id,
  title,
  description,
  eyebrow,
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-28", className)}>
      <div className="space-y-1">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
        )}
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
        {description && (
          <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Separator className="my-5" />
      {children}
    </section>
  );
}

/** Labeled mini-group used inside a Section to caption a row of examples. */
export function Specimen({
  label,
  className,
  children,
}: {
  label?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
      )}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}
