import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import {
  AUTH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  isOAuthEnabled,
} from "@/lib/env";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const { auth, handlers } = NextAuth({
  providers: isOAuthEnabled()
    ? [
        Google({
          clientId: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
        }),
      ]
    : [],
  session: { strategy: "jwt" },
  secret: AUTH_SECRET,
  // Required on Vercel/serverless — Auth.js rejects requests when the Host
  // header doesn't match without this (UntrustedHost / server config error).
  trustHost: true,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt({ token, account }) {
      if (account) {
        token.authId = account.providerAccountId;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = (token.authId ?? token.sub) as string;
      }
      return session;
    },
  },
});
