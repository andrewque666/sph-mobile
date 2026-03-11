"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2 px-4">
      <div className="p-4 rounded-full bg-destructive/10 mb-2">
        <RefreshCw className="h-6 w-6 text-destructive" />
      </div>
      <h1 className="text-xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="text-muted-foreground text-sm mb-4">An unexpected error occurred.</p>
      <Button onClick={reset} variant="outline" className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Try again
      </Button>
    </div>
  );
}
