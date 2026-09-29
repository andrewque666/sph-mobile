import { z } from "zod";

const slug = z
  .string()
  .min(2, "Slug is required")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens");

const optionalText = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : null));

const optionalUrl = z
  .union([z.literal(""), z.string().trim().url("Enter a valid URL")])
  .optional()
  .transform((v) => (v ? v : null));

/**
 * "" / undefined → null; otherwise a Date. Date-only and datetime-local strings
 * carry no offset, so they are read as hospital time (Asia/Manila, UTC+8)
 * regardless of the server's time zone.
 */
const optionalDate = z
  .string()
  .optional()
  .transform((v, ctx) => {
    if (!v) return null;
    const iso = /^\d{4}-\d{2}-\d{2}$/.test(v)
      ? `${v}T00:00:00+08:00`
      : /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(v)
        ? `${v}:00+08:00`
        : v;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) {
      ctx.addIssue({ code: "custom", message: "Invalid date" });
      return z.NEVER;
    }
    return d;
  });

export const postSchema = z.object({
  title: z.string().trim().min(3, "Title is required"),
  slug,
  category: z.enum(["NEWS", "EVENT", "AWARD"]),
  excerpt: z.string().trim().min(10, "Add a short summary").max(300),
  body: z.string().trim().min(10, "Content is required"),
  imageUrl: optionalUrl,
  eventDate: optionalDate,
  location: optionalText,
  published: z.boolean(),
  publishedAt: optionalDate,
});
export type PostInput = z.input<typeof postSchema>;

export const serviceSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  slug,
  shortName: optionalText,
  group: z.enum(["SPECIALTY_HUB", "SPICE", "CANCER_CARE", "ANCILLARY"]),
  tagline: optionalText,
  summary: z.string().trim().min(10, "Add a short summary").max(400),
  body: z.string().trim().min(10, "Description is required"),
  /** One offering per line in the admin form. */
  offerings: z
    .string()
    .optional()
    .transform((v) => (v ?? "").split("\n").map((s) => s.trim()).filter(Boolean)),
  schedule: optionalText,
  phone: optionalText,
  location: optionalText,
  sortOrder: z.number({ message: "Enter a number" }).int().min(0),
  published: z.boolean(),
});
export type ServiceInput = z.input<typeof serviceSchema>;

export const departmentSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  slug,
  description: z.string().trim().min(5, "Description is required"),
  chairman: optionalText,
  hasResidency: z.boolean(),
  facebookUrl: optionalUrl,
  sortOrder: z.number({ message: "Enter a number" }).int().min(0),
  published: z.boolean(),
});
export type DepartmentInput = z.input<typeof departmentSchema>;

export const directoryDoctorSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  departmentId: z.string().min(1, "Department is required"),
  specialty: optionalText,
  room: optionalText,
  schedule: optionalText,
  local: optionalText,
  phone: optionalText,
  published: z.boolean(),
});
export type DirectoryDoctorInput = z.input<typeof directoryDoctorSchema>;

export const inquirySchema = z
  .object({
    type: z.enum(["GENERAL", "APPOINTMENT"]),
    name: z.string().trim().min(2, "Please enter your name").max(120),
    email: z.string().trim().email("Please enter a valid email"),
    phone: z
      .string()
      .trim()
      .max(40)
      .optional()
      .transform((v) => (v ? v : null)),
    subject: z.string().trim().max(160).optional().transform((v) => (v ? v : null)),
    message: z.string().trim().min(10, "Please tell us a little more (at least 10 characters)").max(3000),
    department: z.string().trim().max(120).optional().transform((v) => (v ? v : null)),
    doctor: z.string().trim().max(120).optional().transform((v) => (v ? v : null)),
    preferredDate: optionalDate,
  })
  .refine((d) => d.type !== "APPOINTMENT" || !!d.phone, {
    message: "A contact number is required for appointment requests",
    path: ["phone"],
  });
export type InquiryInput = z.input<typeof inquirySchema>;

export const inquiryStatusSchema = z.object({
  status: z.enum(["NEW", "IN_PROGRESS", "RESOLVED"]),
});
