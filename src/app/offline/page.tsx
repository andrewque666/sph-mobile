import type { Metadata } from "next";
import Link from "next/link";
import { WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Offline · SPHI",
  description: "You are currently offline.",
};

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center text-foreground">
      <span className="rounded bg-white/90 px-2 py-1 ring-1 ring-border">
        <img src="/sphlogo.png" alt="St. Paul's Hospital of Iloilo" className="h-10 w-auto" />
      </span>

      <span className="flex size-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        <WifiOff className="size-7" />
      </span>

      <div className="space-y-1.5">
        <h1 className="text-xl font-semibold tracking-tight">You&apos;re offline</h1>
        <p className="max-w-xs text-sm text-muted-foreground">
          It looks like you&apos;ve lost your connection. Your health information stays
          secure — reconnect to continue.
        </p>
      </div>

      <Button render={<Link href="/dashboard" />}>Try again</Button>
    </div>
  );
}
