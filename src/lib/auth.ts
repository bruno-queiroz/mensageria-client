import NextAuth, { NextAuthOptions } from "next-auth";
import { cookies } from "next/headers";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { Adapter } from "next-auth/adapters";
import { connectDb } from "@/db/connect";
import { setSessionExpireDate } from "@/utils/setSessionExpireDate";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(connectDb()) as Adapter,
  debug: true,
  callbacks: {
    async signIn({ user }) {
      cookies().set("mensageria-user-id", user.id, {
        httpOnly: false,
        secure: true,
        expires: setSessionExpireDate({ days: 30 }),
      });
      return true;
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

export default NextAuth(authOptions);
