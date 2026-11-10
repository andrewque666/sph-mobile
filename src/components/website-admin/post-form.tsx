"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { postSchema, type PostInput } from "@/lib/validations/website";
import { Field, PublishedField, SelectField } from "./form-fields";
import { slugify, useCmsSubmit } from "./use-cms-submit";

const CATEGORIES = [
  { value: "NEWS", label: "News & Press Releases" },
  { value: "EVENT", label: "Events & Conferences" },
  { value: "AWARD", label: "Awards & Certificates" },
];

export function PostForm({ id, defaults }: { id?: string; defaults?: PostInput }) {
  const { submit, error } = useCmsSubmit({ endpoint: "/api/website/posts", id, backTo: "/admin/website/posts" });
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<PostInput>({
    resolver: zodResolver(postSchema, undefined, { raw: true }),
    defaultValues: defaults ?? {
      category: "NEWS",
      published: true,
      publishedAt: new Date().toISOString().slice(0, 10),
    },
  });
  const category = watch("category");

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <Card>
        <CardContent className="space-y-4">
          {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

          <Field id="title" label="Title" error={errors.title?.message}>
            <Input
              id="title"
              {...register("title", {
                onBlur: (e) => {
                  if (!getValues("slug")) setValue("slug", slugify(e.target.value));
                },
              })}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="slug" label="URL slug" error={errors.slug?.message} hint="Appears in the link: /news/your-slug">
              <Input id="slug" {...register("slug")} />
            </Field>
            <SelectField control={control} name="category" label="Category" items={CATEGORIES} error={errors.category?.message} />
          </div>

          <Field id="excerpt" label="Summary" error={errors.excerpt?.message} hint="1–2 sentences shown on cards and in search results (max 300 characters).">
            <Textarea id="excerpt" rows={2} {...register("excerpt")} />
          </Field>

          <Field id="body" label="Content" error={errors.body?.message} hint="Separate paragraphs with a blank line.">
            <Textarea id="body" rows={12} {...register("body")} />
          </Field>

          <Field id="imageUrl" label="Image URL (optional)" error={errors.imageUrl?.message} hint="An https:// link to a landscape photo.">
            <Input id="imageUrl" type="url" {...register("imageUrl")} />
          </Field>

          {category === "EVENT" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="eventDate" label="Event date & time" error={errors.eventDate?.message}>
                <Input id="eventDate" type="datetime-local" {...register("eventDate")} />
              </Field>
              <Field id="location" label="Venue" error={errors.location?.message}>
                <Input id="location" {...register("location")} />
              </Field>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="publishedAt" label="Publish date" error={errors.publishedAt?.message}>
              <Input id="publishedAt" type="date" {...register("publishedAt")} />
            </Field>
            <PublishedField control={control} name="published" />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : id ? "Save changes" : "Create post"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
