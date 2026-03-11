import type { Role, AccountStatus } from "@/lib/types";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: Role;
    status?: AccountStatus;
  }

  interface Session {
    user: {
      id: string;
      role: Role;
      status?: AccountStatus;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    status?: AccountStatus;
  }
}
