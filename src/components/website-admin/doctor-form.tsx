"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { directoryDoctorSchema, type DirectoryDoctorInput } from "@/lib/validations/website";
import { Field, PublishedField, SelectField } from "./form-fields";
import { useCmsSubmit } from "./use-cms-submit";

export function DoctorForm({
  id,
  defaults,
  departments,
}: {
  id?: string;
  defaults?: DirectoryDoctorInput;
  departments: { id: string; name: string }[];
}) {
  const { submit, error } = useCmsSubmit({ endpoint: "/api/website/doctors", id, backTo: "/admin/website/doctors" });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DirectoryDoctorInput>({
    resolver: zodResolver(directoryDoctorSchema, undefined, { raw: true }),
    defaultValues: defaults ?? { published: true },
  });

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <Card>
        <CardContent className="space-y-4">
          {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="firstName" label="First name" error={errors.firstName?.message}>
              <Input id="firstName" {...register("firstName")} />
            </Field>
            <Field id="lastName" label="Last name" error={errors.lastName?.message}>
              <Input id="lastName" {...register("lastName")} />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              control={control}
              name="departmentId"
              label="Department"
              items={departments.map((d) => ({ value: d.id, label: d.name }))}
              error={errors.departmentId?.message}
            />
            <Field id="specialty" label="Subspecialty (optional)" error={errors.specialty?.message} hint="e.g. Nephrology">
              <Input id="specialty" {...register("specialty")} />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
            <Field id="room" label="Clinic room" error={errors.room?.message} hint="e.g. SPICE 252">
              <Input id="room" {...register("room")} />
            </Field>
            <Field id="schedule" label="Clinic hours" error={errors.schedule?.message} hint="e.g. M|T|TH|F 9-1pm · S by appointment">
              <Input id="schedule" {...register("schedule")} />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
            <Field id="local" label="Local no." error={errors.local?.message}>
              <Input id="local" {...register("local")} />
            </Field>
            <Field id="phone" label="Clinic phone(s)" error={errors.phone?.message}>
              <Input id="phone" {...register("phone")} />
            </Field>
          </div>

          <PublishedField control={control} name="published" />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : id ? "Save changes" : "Add doctor"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
