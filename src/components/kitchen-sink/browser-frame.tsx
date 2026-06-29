import * as React from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  /** URL shown in the address bar. */
  url?: string;
  className?: string;
  /** Max height of the scrollable viewport; defaults to a tall desktop view. */
  viewportClassName?: string;
  children: React.ReactNode;
}

/**
 * Desktop browser-chrome mockup. Wraps website previews so they read as
 * "the live website" rather than just another page section.
 */
export function BrowserFrame({
  url = "sphiloilo.com",
  className,
  viewportClassName,
  children,
}: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-xl shadow-black/5 ring-1 ring-foreground/5",
        className
      )}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-3 border-b border-border bg-muted/60 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-red-400/80" />
          <span className="size-3 rounded-full bg-yellow-400/80" />
          <span className="size-3 rounded-full bg-green-400/80" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-background px-3 py-1.5 text-xs text-muted-foreground ring-1 ring-border">
          <Lock className="size-3 shrink-0 text-green-600" />
          <span className="truncate">https://{url}</span>
        </div>
      </div>

      {/* Scrollable viewport */}
      <div
        className={cn(
          "max-h-[640px] overflow-y-auto overflow-x-hidden bg-background",
          viewportClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
