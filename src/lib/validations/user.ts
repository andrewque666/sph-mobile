import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["DOCTOR", "STAFF", "ADMIN"], {
    message: "Role is required",
  }),
  // Doctor-specific fields (required when role is DOCTOR)
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  specialty: z.string().optional(),
  phone: z.string().optional(),
  licenseNumber: z.string().optional(),
}).refine(
  (data) => {
    if (data.role === "DOCTOR") {
      return data.firstName && data.lastName && data.specialty && data.phone;
    }
    return true;
  },
  {
    message: "Doctor accounts require firstName, lastName, specialty, and phone",
    path: ["role"],
  }
);

export type CreateUserInput = z.infer<typeof createUserSchema>;
