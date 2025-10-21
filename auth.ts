import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { KycStatus } from "@/app/generated/prisma";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        number: { label: "Number", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials: any) {
        const number = credentials?.number as string;
        const otp = credentials?.otp as string;

        console.log("Authorizing login for:", number);

        const otpRecord = await prisma.otp.findFirst({
          where: { number, code: otp, expiresAt: { gt: new Date() } },
        });
        if (!otpRecord) throw new Error("Invalid or expired OTP");

        let user = await prisma.user.findUnique({ where: { number } });
        if (user) {
          return {
            id: user.id,
            role: "user",
            number: user.number,
            name: user.name,
            email: user.email,
            kyc_status: user.kyc_status as KycStatus,
          };
        }

        let merchant = await prisma.merchant.findUnique({ where: { number } });
        if (merchant) {
          return {
            id: merchant.id,
            role: "merchant",
            number: merchant.number,
            email: merchant.email,
            business_name: merchant.business_name,
            category: merchant.category,
            business_address: merchant.business_address,
            gst_number: merchant.gst_number,
            pan_number: merchant.pan_number,
            kyc_status: merchant.kyc_status as KycStatus,
          };
        }

        throw new Error("No user or merchant found with this number");
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.number = user.number;
        token.email = user.email;
        token.kyc_status = user.kyc_status;

        if (user.role === "user") {
          token.name = user.name;
        } else if (user.role === "merchant") {
          token.business_name = user.business_name;
          token.category = user.category;
          token.business_address = user.business_address;
          token.gst_number = user.gst_number;
          token.pan_number = user.pan_number;
        }
      }
      return token;
    },

    async session({ session, token }: any) {
      if (token) {
        session.user = {
          id: token.id,
          role: token.role,
          number: token.number,
          email: token.email,
          kyc_status: token.kyc_status,
        };

        if (token.role === "user") {
          session.user.name = token.name;
        } else if (token.role === "merchant") {
          session.user.business_name = token.business_name;
          session.user.category = token.category;
          session.user.business_address = token.business_address;
          session.user.gst_number = token.gst_number;
          session.user.pan_number = token.pan_number;
        }
      }
      return session;
    },
  },

  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin", // you can still customize based on role if needed
  },
  secret: process.env.NEXTAUTH_SECRET,
});
