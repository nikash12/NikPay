import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { KycStatus } from "@/app/generated/prisma"; 

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "user" | "merchant";
      name?: string | null;
      email?: string | null;
      kyc_status?: KycStatus;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: "user" | "merchant";
    name?: string | null;
    email?: string | null;
    kyc_status?: KycStatus;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "user" | "merchant";
    name?: string | null;
    email?: string | null;
    kyc_status?: KycStatus;
  }
}
