import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { db } from "@agentvault/db";
import { hashPassword, verifyPassword } from "./password";
import { bootstrapOrganization } from "@agentvault/api/services/organization-service";
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
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        mode: { label: "Mode", type: "text" },
      },
      authorize: async (credentials) => {
        const email = (credentials?.email as string)?.trim().toLowerCase();
        const password = credentials?.password as string;
        const name = (credentials?.name as string)?.trim() || null;
        const mode = (credentials?.mode as string) || "login";

        if (!email || !password) {
          throw new Error("Email and password are required.");
        }

        if (mode === "signup") {
          if (password.length < 6) {
            throw new Error("Password must be at least 6 characters.");
          }

          const existing = await db.user.findUnique({
            where: { email },
          });

          if (existing) {
            if (existing.passwordHash) {
              const isValid = verifyPassword(password, existing.passwordHash);
              if (isValid) {
                return {
                  id: existing.externalAuthId,
                  email: existing.email,
                  name: existing.name,
                };
              }
            }
            throw new Error(
              "An account with this email already exists. Please sign in.",
            );
          }

          const passwordHash = hashPassword(password);
          const user = await db.user.create({
            data: {
              email,
              name: name || email.split("@")[0],
              externalAuthId: `email:${email}`,
              passwordHash,
              lastLoginAt: new Date(),
            },
          });

          try {
            await bootstrapOrganization(
              user.id,
              user.email,
              user.name ?? undefined,
            );
          } catch {
            // Best-effort; /v1/auth/session will also bootstrap if needed
          }

          return {
            id: user.externalAuthId,
            email: user.email,
            name: user.name,
          };
        }

        // Login mode
        let user = await db.user.findUnique({
          where: { email },
        });

        if (!user) {
          if (password.length >= 6) {
            const passwordHash = hashPassword(password);
            user = await db.user.create({
              data: {
                email,
                name: name || email.split("@")[0],
                externalAuthId: `email:${email}`,
                passwordHash,
                lastLoginAt: new Date(),
              },
            });
            try {
              await bootstrapOrganization(
                user.id,
                user.email,
                user.name ?? undefined,
              );
            } catch {
              // Best-effort
            }
            return {
              id: user.externalAuthId,
              email: user.email,
              name: user.name,
            };
          }
          throw new Error("No account found with this email. Please sign up.");
        }

        if (!user.passwordHash) {
          const passwordHash = hashPassword(password);
          user = await db.user.update({
            where: { id: user.id },
            data: { passwordHash, lastLoginAt: new Date() },
          });
          return {
            id: user.externalAuthId,
            email: user.email,
            name: user.name,
          };
        }

        const isValid = verifyPassword(password, user.passwordHash);
        if (!isValid) {
          throw new Error("Invalid password. Please try again.");
        }

        await db.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.externalAuthId,
          email: user.email,
          name: user.name,
        };
      },
    }),
    ...(isOAuthEnabled()
      ? [
          Google({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  session: { strategy: "jwt" },
  secret: AUTH_SECRET || "onecli-agentvault-auth-secret-key-32b",
  trustHost: true,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt({ token, user, account }) {
      if (user) {
        token.authId = user.id;
      } else if (account) {
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
