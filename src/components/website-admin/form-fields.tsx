"use client";

import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** Label + control + error message, matching the dashboard form layout. */
export function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

/** Controlled Base UI select bound to a react-hook-form field. */
export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  items,
  error,
}: {
  control: Control<T>;
  name: Path<T>;
  label: string;
  items: { value: string; label: string }[];
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select items={items} value={field.value ?? null} onValueChange={(v) => field.onChange(v)}>
            <SelectTrigger className="w-full" aria-label={label}>
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              {items.map((i) => (
                <SelectItem key={i.value} value={i.value}>
                  {i.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

/** Two-option select stored as a boolean. */
export function BooleanField<T extends FieldValues>({
  control,
  name,
  label,
  trueLabel,
  falseLabel,
}: {
  control: Control<T>;
  name: Path<T>;
  label: string;
  trueLabel: string;
  falseLabel: string;
}) {
  const items = [
    { value: "true", label: trueLabel },
    { value: "false", label: falseLabel },
  ];
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select items={items} value={String(field.value)} onValueChange={(v) => field.onChange(v === "true")}>
            <SelectTrigger className="w-full" aria-label={label}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {items.map((i) => (
                <SelectItem key={i.value} value={i.value}>
                  {i.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}

/** Published / Draft visibility toggle. */
export function PublishedField<T extends FieldValues>({ control, name }: { control: Control<T>; name: Path<T> }) {
  return (
    <BooleanField
      control={control}
      name={name}
      label="Visibility"
      trueLabel="Published — visible on the website"
      falseLabel="Draft — hidden from the website"
    />
  );
}
