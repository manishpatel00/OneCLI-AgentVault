import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Source_Serif_4, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "@agentvault/ui/globals.css";
import "./globals.css";
import { AuthProvider } from "@/providers/auth-provider";
import { getAuthMode, isOAuthConfigured } from "@/lib/auth/auth-mode";
import { GATEWAY_API_URL, IS_CLOUD } from "@/lib/env";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@agentvault/ui/components/sonner";
import { ThemeColorSync } from "./_components/theme-color-sync";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
});
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
});

// Auth mode is determined at runtime from /app/data/runtime-config.json
// (written by the Docker entrypoint). force-dynamic ensures the layout
// re-renders per request instead of serving prebuilt static pages.
export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "AgentVault - AI Credential Isolation Gateway",
  description: "Secure gateway for AI agent credentials",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authMode = getAuthMode();
  const oauthConfigured = isOAuthConfigured();

  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      {!IS_CLOUD && (
        <head>
          {/* Runtime config is data, not executable JavaScript. An inline script
              is blocked by nonce-based Content Security Policies. */}
          <meta name="agentvault-gateway-api-url" content={GATEWAY_API_URL} />
        </head>
      )}
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} ${plusJakarta.variable} ${caveat.variable} font-sans`}
        suppressHydrationWarning
      >
        <AuthProvider authMode={authMode} oauthConfigured={oauthConfigured}>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <ThemeColorSync />
              {children}
              <Toaster />
            </ThemeProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
