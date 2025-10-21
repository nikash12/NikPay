import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { KycStatus } from "@/app/generated/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "user" | "merchant";
      email?: string | null;
      kyc_status?: KycStatus;
      number?: string;

      // user-specific
      name?: string | null;

      // merchant-specific
      business_name?: string | null;
      business_address?: string | null;
      category?: string | null;
      gst_number?: string | null;
      pan_number?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: "user" | "merchant";
    email?: string | null;
    kyc_status?: KycStatus;
    number?: string;

    // user-specific
    name?: string | null;

    // merchant-specific
    business_name?: string | null;
    business_address?: string | null;
    category?: string | null;
    gst_number?: string | null;
    pan_number?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "user" | "merchant";
    email?: string | null;
    kyc_status?: KycStatus;
    number?: string;

    // user-specific
    name?: string | null;

    // merchant-specific
    business_name?: string | null;
    business_address?: string | null;
    category?: string | null;
    gst_number?: string | null;
    pan_number?: string | null;
  }
}
