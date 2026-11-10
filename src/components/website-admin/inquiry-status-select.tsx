"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Status = "NEW" | "IN_PROGRESS" | "RESOLVED";

const ITEMS: { value: Status; label: string }[] = [
  { value: "NEW", label: "New" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "RESOLVED", label: "Resolved" },
];

export function InquiryStatusSelect({ id, status }: { id: string; status: Status }) {
  const router = useRouter();
  const [value, setValue] = useState<Status>(status);
  const [saving, setSaving] = useState(false);

  async function update(next: Status) {
    const previous = value;
    setValue(next);
    setSaving(true);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) {
        setValue(previous);
        toast.error("Could not update status");
        return;
      }
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Select items={ITEMS} value={value} onValueChange={(v) => v && update(v as Status)} disabled={saving}>
      <SelectTrigger size="sm" className="w-36" aria-label="Inquiry status">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {ITEMS.map((i) => (
          <SelectItem key={i.value} value={i.value}>
            {i.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
