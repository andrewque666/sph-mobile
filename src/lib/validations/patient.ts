import { z } from "zod";

export const patientRegistrationSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], {
      message: "Gender is required",
    }),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    bloodType: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type PatientRegistrationInput = z.infer<
  typeof patientRegistrationSchema
>;

export const patientUpdateSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phone: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  bloodType: z.string().optional(),
});

export type PatientUpdateInput = z.infer<typeof patientUpdateSchema>;
