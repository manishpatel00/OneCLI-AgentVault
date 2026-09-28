"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@agentvault/ui/components/button";
import { useAuth } from "@/providers/auth-provider";
import { apiFetch } from "@/lib/api-fetch";
import { CAPS } from "@/lib/env";
import type { AuthMode } from "./auth-mode";
import { syncLoginSession } from "./login-session";

export const LoginContent = ({ authMode }: { authMode: AuthMode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryError = searchParams.get("error");
  const { isAuthenticated, isLoading, user, signIn, signOut, authError } =
    useAuth();
  const [signingIn, setSigningIn] = useState(false);
  const [retry, setRetry] = useState(0);
  const [error, setError] = useState<string | null>(queryError);

  useEffect(() => {
    if (queryError) setError(queryError);
  }, [queryError]);

  useEffect(() => {
    if (authError) {
      setError(authError);
      setSigningIn(false);
    }
  }, [authError]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    let active = true;

    const syncUser = async () => {
      const result = await syncLoginSession(() => apiFetch("/v1/auth/session"));
      if (!active) return;
      if (result.status === "ok") {
        if (CAPS.webSurface === "connect-only") {
          router.replace("/app-connect");
        } else {
          router.replace(
            result.projectId ? `/p/${result.projectId}/overview` : "/overview",
          );
        }
      } else if (result.status === "unauthorized") {
        // A stale OAuth cookie cannot be used for session sync.
        await signOut();
      } else {
        // Keep the provider session on transient failures, so the user can retry
        // without another OAuth round-trip. Local mode cannot be signed out.
        setError(result.message);
        setSigningIn(false);
      }
    };

    void syncUser();
    return () => {
      active = false;
    };
  }, [isAuthenticated, user, router, signOut, retry]);

  const handleSignIn = async () => {
    setError(null);
    setSigningIn(true);
    try {
      await signIn();
    } catch {
      setError("Unable to start sign-in. Please try again.");
      setSigningIn(false);
    }
  };

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center px-6 pb-24">
      <div className="mb-8 flex items-center gap-2">
        <Image
          src="/agentvault-logo.png"
          alt="agentvault"
          width={32}
          height={32}
          priority
        />
        <span className="font-bold text-xl tracking-tight">
          Onecli-AgentVault
        </span>
      </div>

      {isLoading || (isAuthenticated && !error) ? (
        <div className="flex flex-col items-center gap-4 py-20">
          <div className="text-brand h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <p className="text-muted-foreground text-sm">
            {isAuthenticated ? "Signing you in..." : "Loading..."}
          </p>
        </div>
      ) : (
        <>
          <div className="mb-8 text-center">
            <h1 className="font-[family-name:var(--font-serif)] text-4xl font-semibold tracking-tight sm:text-5xl">
              Log in
            </h1>
            <p className="text-muted-foreground mt-3 text-lg">
              Continue with your account to
              <br />
              authenticate connections
            </p>
          </div>

          <div className="w-full max-w-sm rounded-2xl border border-border/50 bg-card p-8">
            {error && (
              <div className="mb-4 rounded-lg bg-destructive/15 p-3 text-sm text-destructive font-medium border border-destructive/25 leading-relaxed break-words">
                {error}
              </div>
            )}
            {isAuthenticated && error ? (
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  setError(null);
                  setRetry((count) => count + 1);
                }}
              >
                Retry session sync
              </Button>
            ) : authMode === "local" ? (
              <p className="text-muted-foreground text-center text-sm">
                Local mode does not require a login. Connecting to your
                dashboard...
              </p>
            ) : (
              <Button
                size="lg"
                variant="outline"
                className="w-full gap-2 text-base bg-white text-black hover:bg-gray-100 dark:bg-white dark:text-black dark:hover:bg-gray-100"
                loading={signingIn}
                onClick={() => void handleSignIn()}
              >
                <GoogleIcon />
                {signingIn ? "Redirecting..." : "Continue with Google"}
              </Button>
            )}
            {authMode !== "local" && isAuthenticated && error && (
              <Button
                size="lg"
                variant="outline"
                className="mt-3 w-full"
                onClick={() => void signOut()}
              >
                Sign out and choose another account
              </Button>
            )}
            {authMode !== "local" && (
              <p className="text-muted-foreground mt-4 text-center text-xs">
                By continuing, you acknowledge AgentVault&apos;s{" "}
                <a
                  href="https://agentvault.sh/privacy"
                  className="underline hover:text-foreground"
                >
                  Privacy Policy
                </a>
                .
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const GoogleIcon = () => (
  <svg
    className="h-4 w-4"
    viewBox="-3 0 262 262"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      fill="#4285F4"
    />
    <path
      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      fill="#34A853"
    />
    <path
      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      fill="#FBBC05"
    />
    <path
      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      fill="#EB4335"
    />
  </svg>
);
