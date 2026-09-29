"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

/**
 * Shared create/update submit handler for the website CMS forms.
 * POSTs to `endpoint` when creating, PATCHes `endpoint/:id` when editing.
 */
export function useCmsSubmit({ endpoint, id, backTo }: { endpoint: string; id?: string; backTo: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function submit(data: unknown) {
    setError(null);
    try {
      const res = await fetch(id ? `${endpoint}/${id}` : endpoint, {
        method: id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(typeof body.error === "string" ? body.error : "Please check the highlighted fields and try again.");
        return;
      }
      toast.success(id ? "Changes saved" : "Created");
      router.push(backTo);
      router.refresh();
    } catch {
      setError("Something went wrong");
    }
  }

  return { submit, error };
}

/** "St. Paul's Run 2026" → "st-pauls-run-2026" */
export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
