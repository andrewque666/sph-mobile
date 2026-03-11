import type { NextAuthConfig } from "next-auth";

// This config is used by middleware (Edge runtime) — no DB access here
export default {
  providers: [],
  callbacks: {
    async jwt({ token, user }: { token: Record<string, unknown>; user?: { id?: string; role?: string; status?: string } }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as "PATIENT" | "DOCTOR" | "STAFF" | "ADMIN";
      session.user.status = token.status as "PENDING" | "APPROVED" | "REJECTED" | undefined;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
