"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { departmentSchema, type DepartmentInput } from "@/lib/validations/website";
import { BooleanField, Field, PublishedField } from "./form-fields";
import { slugify, useCmsSubmit } from "./use-cms-submit";

export function DepartmentForm({ id, defaults }: { id?: string; defaults?: DepartmentInput }) {
  const { submit, error } = useCmsSubmit({ endpoint: "/api/website/departments", id, backTo: "/admin/website/departments" });
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentInput>({
    resolver: zodResolver(departmentSchema, undefined, { raw: true }),
    defaultValues: defaults ?? { hasResidency: false, published: true, sortOrder: 0 },
  });

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <Card>
        <CardContent className="space-y-4">
          {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

          <div className="grid gap-4 sm:grid-cols-2">
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
            <Field id="slug" label="Slug" error={errors.slug?.message} hint="Used in links, e.g. /find-a-doctor?department=slug">
              <Input id="slug" {...register("slug")} />
            </Field>
          </div>

          <Field id="description" label="Description" error={errors.description?.message}>
            <Textarea id="description" rows={3} {...register("description")} />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="chairman" label="Chairman (optional)" error={errors.chairman?.message}>
              <Input id="chairman" {...register("chairman")} />
            </Field>
            <Field id="facebookUrl" label="Facebook page (optional)" error={errors.facebookUrl?.message}>
              <Input id="facebookUrl" type="url" {...register("facebookUrl")} />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <BooleanField
              control={control}
              name="hasResidency"
              label="Residency program"
              trueLabel="Accredited residency"
              falseLabel="No residency"
            />
            <Field id="sortOrder" label="Display order" error={errors.sortOrder?.message}>
              <Input id="sortOrder" type="number" min={0} {...register("sortOrder", { valueAsNumber: true })} />
            </Field>
            <PublishedField control={control} name="published" />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : id ? "Save changes" : "Create department"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
