import { Suspense } from "react";
import { LoginContent } from "@/lib/auth/login-content";
import { getAuthMode } from "@/lib/auth/auth-mode";

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-background flex min-h-svh flex-col items-center justify-center">
          <div className="text-brand h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
        </div>
      }
    >
      <LoginContent authMode={getAuthMode()} />
    </Suspense>
  );
}
