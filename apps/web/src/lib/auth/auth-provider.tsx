"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  SessionProvider,
  useSession,
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from "next-auth/react";
import { AuthContext } from "@/providers/auth-provider";
import type { AuthUser, AuthContextValue } from "@/lib/auth/types";
import type { AuthMode } from "@/lib/auth/auth-mode";
import { LOCAL_USER } from "./local-user";

const SESSION_LOAD_TIMEOUT_MS = 8_000;

// Local mode is intentionally single-user: the server authenticates every request
// as local-admin. A browser-only localStorage flag must not gate access or imply
// that "sign out" revokes server access.
const LocalAuthProvider = ({ children }: { children: ReactNode }) => {
  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: true,
      isLoading: false,
      user: LOCAL_USER,
      canSignOut: false,
      signIn: async () => {
        window.location.href = "/overview";
      },
      signOut: async () => {
        window.location.href = "/";
      },
    }),
    [],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const OAuthInner = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [sessionTimedOut, setSessionTimedOut] = useState(false);

  useEffect(() => {
    if (status !== "loading") {
      setSessionTimedOut(false);
      return;
    }

    const timeout = setTimeout(
      () => setSessionTimedOut(true),
      SESSION_LOAD_TIMEOUT_MS,
    );
    return () => clearTimeout(timeout);
  }, [status]);

  const user = useMemo<AuthUser | null>(() => {
    if (!session?.user?.id || !session.user.email) return null;
    return {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name ?? undefined,
    };
  }, [session]);

  const signIn = useCallback(async () => {
    await nextAuthSignIn("google");
  }, []);

  const signInWithCredentials = useCallback(
    async (email: string, password: string) => {
      try {
        const res = await nextAuthSignIn("credentials", {
          email,
          password,
          mode: "login",
          redirect: false,
        });
        if (res?.error) {
          return { ok: false, error: res.error };
        }
        return { ok: true };
      } catch (err) {
        return {
          ok: false,
          error:
            err instanceof Error ? err.message : "Invalid email or password",
        };
      }
    },
    [],
  );

  const signUpWithCredentials = useCallback(
    async (email: string, password: string, name?: string) => {
      try {
        const res = await nextAuthSignIn("credentials", {
          email,
          password,
          name,
          mode: "signup",
          redirect: false,
        });
        if (res?.error) {
          return { ok: false, error: res.error };
        }
        return { ok: true };
      } catch (err) {
        return {
          ok: false,
          error:
            err instanceof Error ? err.message : "Failed to create account",
        };
      }
    },
    [],
  );

  const signOut = useCallback(async () => {
    await nextAuthSignOut({ callbackUrl: "/auth/login" });
  }, []);

  const authError = sessionTimedOut
    ? "Authentication service is taking longer than expected. Check your connection or retry."
    : null;

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: status === "authenticated" && !!user,
      isLoading: status === "loading" && !sessionTimedOut,
      user,
      canSignOut: true,
      signIn,
      signInWithCredentials,
      signUpWithCredentials,
      signOut,
      authError,
    }),
    [
      status,
      user,
      signIn,
      signInWithCredentials,
      signUpWithCredentials,
      signOut,
      sessionTimedOut,
      authError,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const AuthProviderImpl = ({
  children,
  authMode,
}: {
  children: ReactNode;
  authMode: AuthMode;
  oauthConfigured?: boolean;
}) => {
  if (authMode === "local") {
    return <LocalAuthProvider>{children}</LocalAuthProvider>;
  }

  return (
    <SessionProvider>
      <OAuthInner>{children}</OAuthInner>
    </SessionProvider>
  );
};
