// Re-export types used across the app
// These match the Prisma schema enums
export type Role = "PATIENT" | "DOCTOR" | "STAFF" | "ADMIN";
export type AccountStatus = "PENDING" | "APPROVED" | "REJECTED";
export type Gender = "MALE" | "FEMALE" | "OTHER";
