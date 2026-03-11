import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compareSync } from "bcryptjs";
import { db } from "@/lib/db";
import { loginSchema } from "@/lib/validations/auth";
import authConfig from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await db.user.findUnique({
          where: { email: parsed.data.email },
          include: { patientProfile: true },
        });

        if (!user) return null;
        if (!compareSync(parsed.data.password, user.passwordHash)) return null;

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          status: user.patientProfile?.status ?? undefined,
        };
      },
    }),
  ],
});
