"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail, User as UserIcon } from "lucide-react";
import { Button } from "@agentvault/ui/components/button";
import { Input } from "@agentvault/ui/components/input";
import { Label } from "@agentvault/ui/components/label";
import { useAuth } from "@/providers/auth-provider";
import { apiFetch } from "@/lib/api-fetch";
import { CAPS } from "@/lib/env";
import type { AuthMode } from "./auth-mode";
import { syncLoginSession } from "./login-session";

export const LoginContent = ({ authMode }: { authMode: AuthMode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryError = searchParams.get("error");
  const {
    isAuthenticated,
    isLoading,
    user,
    signIn,
    signInWithCredentials,
    signUpWithCredentials,
    signOut,
    authError,
  } = useAuth();

  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [retry, setRetry] = useState(0);
  const [error, setError] = useState<string | null>(queryError);

  useEffect(() => {
    if (queryError) {
      if (queryError === "CredentialsSignin") {
        setError(
          "Invalid email or password. Please try again or create an account.",
        );
      } else {
        setError(queryError);
      }
    }
  }, [queryError]);

  useEffect(() => {
    if (authError) {
      setError(authError);
      setSubmitting(false);
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
        await signOut();
      } else {
        setError(result.message);
        setSubmitting(false);
      }
    };

    void syncUser();
    return () => {
      active = false;
    };
  }, [isAuthenticated, user, router, signOut, retry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);

    try {
      if (tab === "signup") {
        if (!signUpWithCredentials) {
          throw new Error("Sign-up is not available.");
        }
        const res = await signUpWithCredentials(
          trimmedEmail,
          password,
          name.trim(),
        );
        if (!res.ok) {
          setError(res.error || "Failed to create account.");
          setSubmitting(false);
        }
      } else {
        if (!signInWithCredentials) {
          throw new Error("Sign-in is not available.");
        }
        const res = await signInWithCredentials(trimmedEmail, password);
        if (!res.ok) {
          setError(res.error || "Invalid email or password.");
          setSubmitting(false);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await signIn();
    } catch {
      setError("Unable to start Google sign-in. Please try email login.");
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center px-4 py-12 sm:px-6">
      <div className="mb-6 flex items-center gap-2.5">
        <Image
          src="/agentvault-logo.png"
          alt="agentvault"
          width={36}
          height={36}
          priority
        />
        <span className="font-bold text-2xl tracking-tight">
          Onecli-AgentVault
        </span>
      </div>

      {isLoading || (isAuthenticated && !error) ? (
        <div className="flex flex-col items-center gap-4 py-20">
          <div className="text-brand h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <p className="text-muted-foreground text-sm">
            {isAuthenticated ? "Signing you in..." : "Loading session..."}
          </p>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="font-[family-name:var(--font-serif)] text-3xl font-semibold tracking-tight sm:text-4xl">
              {tab === "signin" ? "Welcome back" : "Create an account"}
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              {tab === "signin"
                ? "Enter your credentials to access your AgentVault workspace"
                : "Get started with your AgentVault workspace in seconds"}
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8">
            {/* Tab Switcher */}
            <div className="mb-6 grid grid-cols-2 gap-1 rounded-lg bg-muted p-1 text-sm font-medium">
              <button
                type="button"
                onClick={() => {
                  setTab("signin");
                  setError(null);
                }}
                className={`rounded-md py-2 transition-all ${
                  tab === "signin"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab("signup");
                  setError(null);
                }}
                className={`rounded-md py-2 transition-all ${
                  tab === "signup"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign Up
              </button>
            </div>

            {error && (
              <div className="mb-5 rounded-lg bg-destructive/10 p-3 text-sm text-destructive font-medium border border-destructive/20 leading-relaxed">
                {error}
              </div>
            )}

            {isAuthenticated && error ? (
              <div className="space-y-3">
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
                {authMode !== "local" && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full"
                    onClick={() => void signOut()}
                  >
                    Sign out and switch account
                  </Button>
                )}
              </div>
            ) : authMode === "local" ? (
              <div className="space-y-4 text-center">
                <p className="text-muted-foreground text-sm">
                  Running in single-user local mode. No credentials required.
                </p>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    window.location.href = "/overview";
                  }}
                >
                  Enter Workspace
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {tab === "signup" && (
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-semibold">
                      Full Name
                    </Label>
                    <div className="relative">
                      <UserIcon className="text-muted-foreground absolute left-3 top-2.5 size-4" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-9"
                        disabled={submitting}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute left-3 top-2.5 size-4" />
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9"
                      autoComplete="email"
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-semibold">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="text-muted-foreground absolute left-3 top-2.5 size-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder={
                        tab === "signup" ? "At least 6 characters" : "••••••••"
                      }
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 pr-9"
                      autoComplete={
                        tab === "signup" ? "new-password" : "current-password"
                      }
                      disabled={submitting}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted-foreground hover:text-foreground absolute right-3 top-2.5"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-2 font-medium"
                  loading={submitting}
                >
                  {tab === "signin"
                    ? submitting
                      ? "Signing in..."
                      : "Sign In"
                    : submitting
                      ? "Creating account..."
                      : "Create Account"}
                </Button>

                {/* Optional Google Login */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      or
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-2 text-sm bg-background hover:bg-muted"
                  disabled={submitting}
                  onClick={() => void handleGoogleSignIn()}
                >
                  <GoogleIcon />
                  Continue with Google
                </Button>
              </form>
            )}

            <p className="text-muted-foreground mt-6 text-center text-xs">
              By continuing, you acknowledge AgentVault&apos;s{" "}
              <a
                href="https://agentvault.sh/privacy"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-foreground"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const GoogleIcon = () => (
  <svg
    className="h-4 w-4 shrink-0"
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
