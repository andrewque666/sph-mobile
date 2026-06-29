"use client";

import { useEffect, useState } from "react";
import { Download, X, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * "Add to Home Screen" prompt. Listens for the browser's beforeinstallprompt
 * event and surfaces a dismissible install banner. Renders nothing until the
 * browser signals the app is installable.
 */
export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    const onInstalled = () => {
      setVisible(false);
      setDeferred(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!visible || !deferred) return null;

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setVisible(false);
    setDeferred(null);
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-sm items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-lg ring-1 ring-foreground/10 animate-slide-up">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Stethoscope className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-tight">Install the SPH app</p>
        <p className="text-xs text-muted-foreground">Faster access, right from your home screen.</p>
      </div>
      <Button size="sm" onClick={install}>
        <Download /> Install
      </Button>
      <Button
        size="icon-sm"
        variant="ghost"
        aria-label="Dismiss"
        onClick={() => setVisible(false)}
      >
        <X />
      </Button>
    </div>
  );
}
