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
        console.log("Authorizing user with number:", number, "and OTP:", otp);
        // check OTP
        const otpRecord = await prisma.otp.findFirst({
          where: { number, code: otp, expiresAt: { gt: new Date() } },
        });
        if (!otpRecord) throw new Error("OTP invalid or expired");

        // fetch user
        const user = await prisma.user.findUnique({ where: { number } });
        if (!user) throw new Error("User not found");

        return {
          id: user.id,
          role: "user",
          number: user.number,
          name: user.name,
          email: user.email,
          kyc_status: user.kyc_status as KycStatus,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.kyc_status = user.kyc_status;
        token.number = user.number;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = {
          id: token.id,
          role: token.role,
          name: token.name,
          email: token.email,
          kyc_status: token.kyc_status,
        };
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/user/signin" },
  secret: process.env.NEXTAUTH_SECRET,
})
