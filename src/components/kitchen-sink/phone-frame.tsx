"use client";

import * as React from "react";
import { Signal, Wifi, BatteryFull } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PhoneTab {
  label: string;
  icon: LucideIcon;
  active?: boolean;
}

interface PhoneFrameProps {
  /** Screen title shown under the status bar (optional). */
  caption?: string;
  /** Bottom tab-bar items. Omit to hide the tab bar (e.g. a login screen). */
  tabs?: PhoneTab[];
  className?: string;
  children: React.ReactNode;
}

/**
 * Phone device frame (bezel, notch, status bar, home indicator) with an
 * optional bottom tab bar. Wraps a single app screen so it reads as the
 * mobile app to the client.
 */
export function PhoneFrame({ caption, tabs, className, children }: PhoneFrameProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={cn(
          "relative w-[300px] shrink-0 rounded-[2.75rem] border border-border bg-foreground p-2.5 shadow-2xl shadow-black/20",
          className
        )}
      >
        {/* Screen */}
        <div className="relative h-[620px] overflow-hidden rounded-[2.25rem] bg-background">
          {/* Status bar */}
          <div className="relative z-20 flex h-10 items-center justify-between bg-primary px-6 pt-1 text-[11px] font-medium text-primary-foreground">
            <span>9:41</span>
            {/* Notch */}
            <div className="absolute left-1/2 top-0 h-5 w-32 -translate-x-1/2 rounded-b-2xl bg-foreground" />
            <div className="flex items-center gap-1.5">
              <Signal className="size-3.5" />
              <Wifi className="size-3.5" />
              <BatteryFull className="size-4" />
            </div>
          </div>

          {/* Scrollable screen content */}
          <div className="h-[calc(620px-2.5rem)] overflow-y-auto overflow-x-hidden pb-16">
            {children}
          </div>

          {/* Bottom tab bar */}
          {tabs && tabs.length > 0 && (
            <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-around border-t border-border bg-card/95 px-2 pb-3 pt-2 backdrop-blur">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <div
                    key={tab.label}
                    className={cn(
                      "flex flex-col items-center gap-1 text-[10px] font-medium",
                      tab.active ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <Icon className="size-5" />
                    <span>{tab.label}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Home indicator */}
          <div className="pointer-events-none absolute bottom-1.5 left-1/2 z-30 h-1 w-28 -translate-x-1/2 rounded-full bg-foreground/30" />
        </div>
      </div>

      {caption && (
        <p className="text-sm font-medium text-muted-foreground">{caption}</p>
      )}
    </div>
  );
}
