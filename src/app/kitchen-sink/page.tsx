"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Palette, Globe, Smartphone, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { UiKit } from "@/components/kitchen-sink/ui-kit";
import { WebsitePreview } from "@/components/kitchen-sink/website-preview";
import { AppPreview } from "@/components/kitchen-sink/app-preview";

type AreaId = "ui-kit" | "website" | "app";

const AREAS: { id: AreaId; label: string; icon: typeof Palette }[] = [
  { id: "ui-kit", label: "Brand & UI Kit", icon: Palette },
  { id: "website", label: "Website", icon: Globe },
  { id: "app", label: "Mobile App", icon: Smartphone },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {/* CSS-driven swap avoids any hydration mismatch */}
      <Moon className="dark:hidden" />
      <Sun className="hidden dark:block" />
    </Button>
  );
}

export default function KitchenSinkPage() {
  const [area, setArea] = useState<AreaId>("ui-kit");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="rounded bg-white/90 px-1.5 py-0.5 ring-1 ring-border">
              <img src="/sphlogo.png" alt="SPH Hospital" className="h-7 w-auto" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold leading-tight">
                SPH Design System
              </p>
              <p className="text-xs text-muted-foreground">Kitchen Sink</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Area nav */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="flex gap-1 overflow-x-auto pb-2">
            {AREAS.map((a) => {
              const Icon = a.icon;
              const active = area === a.id;
              return (
                <button
                  key={a.id}
                  onClick={() => setArea(a.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  {a.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Intro */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Badge variant="secondary" className="mb-3">
            Client design proposal · v1
          </Badge>
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            St. Paul&apos;s Hospital of Iloilo — App &amp; Website
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            A single source of truth for the look and feel of the SPHI digital
            experience: the reusable component library, the public website, and
            the patient mobile app — all built from one teal &ldquo;medical-luxe&rdquo;
            design language. Use the tabs above to explore, and the toggle to
            preview light and dark.
          </p>
          <a
            href="https://sphiloilo.com"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Inspired by sphiloilo.com <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </section>

      {/* Active area */}
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {area === "ui-kit" && <UiKit />}
        {area === "website" && (
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Public website
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Homepage preview
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Responsive marketing site modeled on the structure of
                sphiloilo.com — hero, Online Result Viewer, specialty hub, news
                and contact.
              </p>
            </div>
            <WebsitePreview />
          </div>
        )}
        {area === "app" && <AppPreview />}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-muted-foreground sm:px-6">
          SPH Design System · Kitchen Sink — for client review. Not the live
          hospital website.
        </div>
      </footer>
    </div>
  );
}
