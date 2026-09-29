"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { serviceSchema, type ServiceInput } from "@/lib/validations/website";
import { Field, PublishedField, SelectField } from "./form-fields";
import { slugify, useCmsSubmit } from "./use-cms-submit";

const GROUPS = [
  { value: "SPECIALTY_HUB", label: "Specialty Hub" },
  { value: "SPICE", label: "S.P.I.C.E." },
  { value: "CANCER_CARE", label: "Cancer Care" },
  { value: "ANCILLARY", label: "Ancillary Services" },
];

export function ServiceForm({ id, defaults }: { id?: string; defaults?: ServiceInput }) {
  const { submit, error } = useCmsSubmit({ endpoint: "/api/website/services", id, backTo: "/admin/website/services" });
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ServiceInput>({
    resolver: zodResolver(serviceSchema, undefined, { raw: true }),
    defaultValues: defaults ?? { group: "SPICE", published: true, sortOrder: 0 },
  });

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <Card>
        <CardContent className="space-y-4">
          {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

          <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
            <Field id="name" label="Name" error={errors.name?.message}>
              <Input
                id="name"
                {...register("name", {
                  onBlur: (e) => {
                    if (!getValues("slug")) setValue("slug", slugify(e.target.value));
                  },
                })}
              />
            </Field>
            <Field id="shortName" label="Short name (optional)" error={errors.shortName?.message} hint="e.g. SPARC, HBOT">
              <Input id="shortName" {...register("shortName")} />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field id="slug" label="URL slug" error={errors.slug?.message} hint="/services/your-slug">
              <Input id="slug" {...register("slug")} />
            </Field>
            <SelectField control={control} name="group" label="Category" items={GROUPS} error={errors.group?.message} />
            <Field id="sortOrder" label="Display order" error={errors.sortOrder?.message} hint="Lower numbers appear first">
              <Input id="sortOrder" type="number" min={0} {...register("sortOrder", { valueAsNumber: true })} />
            </Field>
          </div>

          <Field id="tagline" label="Tagline (optional)" error={errors.tagline?.message}>
            <Input id="tagline" {...register("tagline")} />
          </Field>

          <Field id="summary" label="Summary" error={errors.summary?.message} hint="Shown on service cards and in search results (max 400 characters).">
            <Textarea id="summary" rows={3} {...register("summary")} />
          </Field>

          <Field id="body" label="Full description" error={errors.body?.message} hint="Separate paragraphs with a blank line.">
            <Textarea id="body" rows={10} {...register("body")} />
          </Field>

          <Field id="offerings" label="Services offered" error={errors.offerings?.message} hint="One item per line.">
            <Textarea id="offerings" rows={6} {...register("offerings")} />
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field id="schedule" label="Schedule" error={errors.schedule?.message}>
              <Input id="schedule" {...register("schedule")} />
            </Field>
            <Field id="phone" label="Phone / local" error={errors.phone?.message}>
              <Input id="phone" {...register("phone")} />
            </Field>
            <Field id="location" label="Location" error={errors.location?.message}>
              <Input id="location" {...register("location")} />
            </Field>
          </div>

          <PublishedField control={control} name="published" />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : id ? "Save changes" : "Create service"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
