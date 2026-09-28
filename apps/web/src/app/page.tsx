"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Lock,
  Activity,
  Users,
  CheckCircle2,
  Code2,
  Link2,
  ShieldCheck,
  Sun,
  Moon,
  Copy,
  Github,
  Heart,
  Repeat2,
  MessageCircle,
  BarChart3,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

/**
 * A video component that swaps src between light and dark variants
 * based on the current theme.
 */
function ThemedVideo({
  lightSrc,
  darkSrc,
}: {
  lightSrc: string;
  darkSrc: string;
}) {
  const { resolvedTheme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const src = resolvedTheme === "dark" ? darkSrc : lightSrc;
    if (vid.getAttribute("src") !== src) {
      vid.src = src;
      vid.load();
      vid.play().catch(() => {});
    }
  }, [resolvedTheme, lightSrc, darkSrc]);

  return (
    <video
      ref={videoRef}
      src={lightSrc}
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-auto"
    />
  );
}

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const envSnippet = `OPENAI_API_KEY=sk-proj-Xh4mQ2████████f8Kw
STRIPE_SECRET_KEY=sk_live_51Hx8m████████Rq2v
GITHUB_TOKEN=ghp_uV4nR7Tk████████p3Xz
AWS_SECRET_ACCESS_KEY=aK9dPmXw████████L7Rq
DATABASE_URL=postgres://acme:pg4s█████@db.acme.io
SLACK_BOT_TOKEN=xoxb-8214-Ju7wK████████m2Np
ANTHROPIC_API_KEY=sk-ant-api03-R5kT████████v8Nq`;

  const handleCopy = () => {
    void navigator.clipboard.writeText(envSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-brand/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/agentvault-logo.png"
              alt="AgentVault"
              width={28}
              height={28}
              priority
              className="transition-transform group-hover:scale-105"
            />
            <span className="font-bold text-lg tracking-tight">
              Onecli-AgentVault
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground absolute left-1/2 -translate-x-1/2">
            <Link
              href="/"
              className="hover:text-foreground transition-colors hover:scale-105"
            >
              Home
            </Link>
            <Link
              href="#product"
              className="hover:text-foreground transition-colors hover:scale-105"
            >
              Product
            </Link>
            <Link
              href="https://github.com/manishpatel00/Onecli-AgentVault#readme"
              target="_blank"
              className="hover:text-foreground transition-colors hover:scale-105"
            >
              Docs
            </Link>
            <Link
              href="#pricing"
              className="hover:text-foreground transition-colors hover:scale-105"
            >
              Pricing
            </Link>
            <Link
              href="https://github.com/manishpatel00/Onecli-AgentVault"
              target="_blank"
              className="hover:text-foreground transition-colors hover:scale-105 inline-flex items-center gap-1.5"
            >
              <Github className="size-3.5" />
              GitHub
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-input bg-background/50 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
              aria-label="Toggle theme"
            >
              <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>
            <Link
              href="/auth/login"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-all hover:bg-primary/90 hover:shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32 bg-math-grid">
          {/* Subtle Ambient Radial Glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(16,185,129,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(16,185,129,0.18),transparent_70%)]" />

          <div className="container relative mx-auto max-w-6xl px-4 text-center">
            {/* Version / Feature Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/70 px-3.5 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md mb-8 shadow-xs transition-all hover:border-foreground/20 hover:text-foreground">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-foreground">
                OneCLI-AgentVault
              </span>
              <span className="text-border">|</span>
              <span>The Privacy-First Credential Gateway</span>
            </div>

            <h1 className="text-5xl font-extrabold sm:text-6xl lg:text-7xl mb-6 leading-[1.14] tracking-tight text-foreground text-balance">
              The{" "}
              <span className="font-handwriting text-[#E53935] dark:text-[#F87171] text-[1.25em] font-normal inline-block -rotate-2">
                Credential
              </span>{" "}
              gateway <br className="hidden sm:block" />
              for{" "}
              <span className="text-[#00B050] dark:text-[#34D399] font-extrabold">
                AI Agents
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-12 leading-relaxed text-balance">
              Route every request through AgentVault.{" "}
              <br className="hidden sm:block" />
              Enforce policies, inject credentials. Keys never leave the vault.
            </p>

            {/* Code Mockup Card */}
            <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0c1017] shadow-2xl mb-12 transition-all hover:border-zinc-700/80">
              <div className="flex items-center justify-between border-b border-zinc-800/80 bg-[#161b22]/70 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                    <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                    <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono ml-1">
                    <span className="text-zinc-500 font-bold">{">_"}</span>
                    <span>.env — proxied by agentvault</span>
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                  aria-label="Copy code"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">
                        Copied!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-5 sm:p-6 text-left font-mono text-xs sm:text-sm bg-[#0c1017] text-zinc-200 overflow-x-auto space-y-2">
                {/* 1. OPENAI_API_KEY */}
                <div className="flex items-center justify-between py-1 px-1.5 rounded-md hover:bg-zinc-800/30 transition-colors group">
                  <div className="flex items-center flex-wrap">
                    <span className="text-[#38BDF8] font-semibold">
                      OPENAI_API_KEY
                    </span>
                    <span className="text-zinc-300">=</span>
                    <span className="text-zinc-200">sk-proj-Xh4mQ2</span>
                    <span className="inline-block h-3.5 w-18 sm:w-20 bg-[#D1D5DB] rounded-xs mx-1 align-middle opacity-90" />
                    <span className="text-zinc-200">f8Kw</span>
                  </div>
                  <span className="text-[#34D399] text-xs flex items-center gap-1.5 bg-[#064e3b]/30 border border-[#059669]/30 px-2.5 py-0.5 rounded-md font-medium">
                    <Check className="size-3" /> agentvault-managed
                  </span>
                </div>

                {/* 2. STRIPE_SECRET_KEY */}
                <div className="flex items-center justify-between py-1 px-1.5 rounded-md hover:bg-zinc-800/30 transition-colors group">
                  <div className="flex items-center flex-wrap">
                    <span className="text-[#38BDF8] font-semibold">
                      STRIPE_SECRET_KEY
                    </span>
                    <span className="text-zinc-300">=</span>
                    <span className="text-zinc-200">sk_live_51Hx8m</span>
                    <span className="inline-block h-3.5 w-20 sm:w-24 bg-[#D1D5DB] rounded-xs mx-1 align-middle opacity-90" />
                    <span className="text-zinc-200">Rq2v</span>
                  </div>
                  <span className="text-[#34D399] text-xs flex items-center gap-1.5 bg-[#064e3b]/30 border border-[#059669]/30 px-2.5 py-0.5 rounded-md font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <Check className="size-3" /> agentvault-managed
                  </span>
                </div>

                {/* 3. GITHUB_TOKEN */}
                <div className="flex items-center justify-between py-1 px-1.5 rounded-md hover:bg-zinc-800/30 transition-colors group">
                  <div className="flex items-center flex-wrap">
                    <span className="text-[#38BDF8] font-semibold">
                      GITHUB_TOKEN
                    </span>
                    <span className="text-zinc-300">=</span>
                    <span className="text-zinc-200">ghp_uV4nR7Tk</span>
                    <span className="inline-block h-3.5 w-18 sm:w-20 bg-[#D1D5DB] rounded-xs mx-1 align-middle opacity-90" />
                    <span className="text-zinc-200">p3Xz</span>
                  </div>
                  <span className="text-[#34D399] text-xs flex items-center gap-1.5 bg-[#064e3b]/30 border border-[#059669]/30 px-2.5 py-0.5 rounded-md font-medium">
                    <Check className="size-3" /> agentvault-managed
                  </span>
                </div>

                {/* 4. AWS_SECRET_ACCESS_KEY */}
                <div className="flex items-center justify-between py-1 px-1.5 rounded-md hover:bg-zinc-800/30 transition-colors group">
                  <div className="flex items-center flex-wrap">
                    <span className="text-[#38BDF8] font-semibold">
                      AWS_SECRET_ACCESS_KEY
                    </span>
                    <span className="text-zinc-300">=</span>
                    <span className="text-zinc-200">aK9dPmXw</span>
                    <span className="inline-block h-3.5 w-20 sm:w-22 bg-[#D1D5DB] rounded-xs mx-1 align-middle opacity-90" />
                    <span className="text-zinc-200">L7Rq</span>
                  </div>
                  <span className="text-[#34D399] text-xs flex items-center gap-1.5 bg-[#064e3b]/30 border border-[#059669]/30 px-2.5 py-0.5 rounded-md font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <Check className="size-3" /> agentvault-managed
                  </span>
                </div>

                {/* 5. DATABASE_URL */}
                <div className="flex items-center justify-between py-1 px-1.5 rounded-md hover:bg-zinc-800/30 transition-colors group">
                  <div className="flex items-center flex-wrap">
                    <span className="text-[#38BDF8] font-semibold">
                      DATABASE_URL
                    </span>
                    <span className="text-zinc-300">=</span>
                    <span className="text-zinc-200">postgres://acme:pg4s</span>
                    <span className="inline-block h-3.5 w-14 sm:w-16 bg-[#D1D5DB] rounded-xs mx-1 align-middle opacity-90" />
                    <span className="text-zinc-200">@db.acme.io</span>
                  </div>
                  <span className="text-[#34D399] text-xs flex items-center gap-1.5 bg-[#064e3b]/30 border border-[#059669]/30 px-2.5 py-0.5 rounded-md font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <Check className="size-3" /> agentvault-managed
                  </span>
                </div>

                {/* 6. SLACK_BOT_TOKEN */}
                <div className="flex items-center justify-between py-1 px-1.5 rounded-md hover:bg-zinc-800/30 transition-colors group">
                  <div className="flex items-center flex-wrap">
                    <span className="text-[#38BDF8] font-semibold">
                      SLACK_BOT_TOKEN
                    </span>
                    <span className="text-zinc-300">=</span>
                    <span className="text-zinc-200">xoxb-8214-Ju7wK</span>
                    <span className="inline-block h-3.5 w-18 sm:w-20 bg-[#D1D5DB] rounded-xs mx-1 align-middle opacity-90" />
                    <span className="text-zinc-200">m2Np</span>
                  </div>
                  <span className="text-[#34D399] text-xs flex items-center gap-1.5 bg-[#064e3b]/30 border border-[#059669]/30 px-2.5 py-0.5 rounded-md font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <Check className="size-3" /> agentvault-managed
                  </span>
                </div>

                {/* 7. ANTHROPIC_API_KEY */}
                <div className="flex items-center justify-between py-1 px-1.5 rounded-md hover:bg-zinc-800/30 transition-colors group">
                  <div className="flex items-center flex-wrap">
                    <span className="text-[#38BDF8] font-semibold">
                      ANTHROPIC_API_KEY
                    </span>
                    <span className="text-zinc-300">=</span>
                    <span className="text-zinc-200">sk-ant-api03-R5kT</span>
                    <span className="inline-block h-3.5 w-18 sm:w-22 bg-[#D1D5DB] rounded-xs mx-1 align-middle opacity-90" />
                    <span className="text-zinc-200">v8Nq</span>
                  </div>
                  <span className="text-[#34D399] text-xs flex items-center gap-1.5 bg-[#064e3b]/30 border border-[#059669]/30 px-2.5 py-0.5 rounded-md font-medium">
                    <Check className="size-3" /> agentvault-managed
                  </span>
                </div>

                {/* Footer Bar */}
                <div className="mt-5 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row justify-between items-center gap-2 font-mono text-xs">
                  <span className="text-zinc-400 font-normal">
                    Ready for Cursor, Claude Code, LangChain &amp; n8n
                  </span>
                  <span className="text-[#00DF89] font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#00DF89]" />0
                    secrets exposed to models
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/auth/login"
                className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-xl bg-brand px-8 text-base font-medium text-primary-foreground shadow-sm transition-all hover:bg-brand/90 hover:shadow-md hover:scale-[1.02]"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="https://github.com/manishpatel00/Onecli-AgentVault#readme"
                target="_blank"
                className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-xl border border-input bg-card/60 px-8 text-base font-medium text-foreground shadow-xs transition-all hover:bg-accent hover:text-accent-foreground hover:scale-[1.02]"
              >
                Explore Documentation
              </Link>
            </div>

            {/* Integrations Infinite Marquee Section */}
            <div className="pt-10 border-t border-border/40">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6">
                Connects with 50+ Tools, LLMs &amp; APIs
              </p>

              {/* Marquee Row 1: Platforms & APIs */}
              <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] py-2">
                <div className="animate-marquee flex items-center gap-4">
                  {[
                    {
                      name: "GitHub",
                      icon: (
                        <svg
                          className="size-4 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      ),
                    },
                    {
                      name: "GitLab",
                      icon: (
                        <svg className="size-4" viewBox="0 0 24 24">
                          <path
                            fill="#E24329"
                            d="m12 18.06-4.575-14.08h9.15L12 18.06Z"
                          />
                          <path
                            fill="#FC6D26"
                            d="M12 18.06 7.425 3.98H2.16L12 18.06Z"
                          />
                          <path
                            fill="#FCA326"
                            d="m2.16 3.98-1.92 5.91a.88.88 0 0 0 .32.99L12 18.06 2.16 3.98Z"
                          />
                          <path
                            fill="#E24329"
                            d="M2.16 3.98h5.265L4.79 11.83 2.16 3.98Z"
                          />
                          <path
                            fill="#FC6D26"
                            d="M12 18.06 16.575 3.98h5.265L12 18.06Z"
                          />
                          <path
                            fill="#FCA326"
                            d="m21.84 3.98 1.92 5.91a.88.88 0 0 1-.32.99L12 18.06 21.84 3.98Z"
                          />
                          <path
                            fill="#E24329"
                            d="M21.84 3.98h-5.265l2.635 7.85 2.63-7.85Z"
                          />
                        </svg>
                      ),
                    },
                    {
                      name: "Google Workspace",
                      icon: (
                        <svg className="size-4" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24Z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.28 14.27a7.2 7.2 0 0 1 0-4.54V6.58H1.25a11.96 11.96 0 0 0 0 10.84l4.03-3.15Z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                          />
                        </svg>
                      ),
                    },
                    {
                      name: "HubSpot",
                      icon: (
                        <svg
                          className="size-4"
                          viewBox="0 0 24 24"
                          fill="#FF7A59"
                        >
                          <path d="M18.8 8.1V5.7c.8-.4 1.4-1.2 1.4-2.2 0-1.4-1.1-2.5-2.5-2.5S15.2 2.1 15.2 3.5c0 1 .6 1.8 1.4 2.2v2.4c-1.1.4-2 1.2-2.4 2.3l-5.6-4.3c.1-.4.1-.7.1-1.1 0-2-1.6-3.5-3.5-3.5S1.7 3 1.7 5s1.6 3.5 3.5 3.5c.6 0 1.2-.2 1.7-.5l5.5 4.3c-.6 1.1-.7 2.4-.2 3.6l-3.3 2.1c-.5-.4-1.1-.6-1.7-.6-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3c0-.3 0-.5-.1-.7l3.3-2.1c1.2.9 2.9 1 4.2.3 1.3-.7 2.1-2.1 2.1-3.6 0-.8-.2-1.5-.6-2.1l2.8-1.8c.6.5 1.4.8 2.2.8 1.9 0 3.5-1.6 3.5-3.5 0-2-1.6-3.5-3.5-3.5-1.5 0-2.8 1-3.3 2.4z" />
                        </svg>
                      ),
                    },
                    {
                      name: "Jira",
                      icon: (
                        <svg
                          className="size-4"
                          viewBox="0 0 24 24"
                          fill="#0052CC"
                        >
                          <path d="M11.571 11.429h-8.08c-.78 0-1.414-.634-1.414-1.414s.634-1.415 1.414-1.415h8.08v2.829zm0-5.715H2.077c-.78 0-1.414-.633-1.414-1.414s.634-1.414 1.414-1.414h9.494v2.828zm11.766 5.715H15.26c-.78 0-1.414-.634-1.414-1.414s.634-1.415 1.414-1.415h8.077v2.829zm0-5.715h-9.49c-.78 0-1.415-.633-1.415-1.414s.634-1.414 1.415-1.414h9.49v2.828zM11.571 22.857H.663c-.78 0-1.414-.633-1.414-1.414s.634-1.414 1.414-1.414h10.908v2.828zm11.766 0h-9.49c-.78 0-1.415-.633-1.415-1.414s.634-1.414 1.415-1.414h9.49v2.828zm-11.766-5.714H3.49c-.78 0-1.414-.634-1.414-1.414s.634-1.415 1.414-1.415h8.08v2.829zm11.766 0h-8.077c-.78 0-1.414-.634-1.414-1.414s.634-1.415 1.414-1.415h8.077v2.829z" />
                        </svg>
                      ),
                    },
                    {
                      name: "Linear",
                      icon: (
                        <svg
                          className="size-4"
                          viewBox="0 0 24 24"
                          fill="#5E6AD2"
                        >
                          <path d="M3.18 2.05a1.5 1.5 0 0 0-.82 1.34v17.22a1.5 1.5 0 0 0 2.45 1.15l15.5-13.3a1.5 1.5 0 0 0 .15-2.13L5.4 2.37a1.5 1.5 0 0 0-2.22-.32Z" />
                          <path d="M12.5 14.8 4.2 21.9a1.5 1.5 0 0 0 1.95.12l14.4-11.2-8.05 4Z" />
                        </svg>
                      ),
                    },
                    {
                      name: "Stripe",
                      icon: (
                        <svg
                          className="size-4"
                          viewBox="0 0 24 24"
                          fill="#635BFF"
                        >
                          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.52.5 6.05.5 2.115 3.86 2.115 8.877c0 7.828 10.75 6.577 10.75 9.96 0 .993-.868 1.47-2.072 1.47-2.61 0-5.46-1.259-7.227-2.246l-.92 5.56C4.462 24.58 7.327 25.5 10.82 25.5c6.808 0 11.065-3.356 11.065-8.528 0-8.236-10.75-6.85-10.75-9.96 0-.868.744-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494z" />
                        </svg>
                      ),
                    },
                    {
                      name: "Slack",
                      icon: (
                        <svg className="size-4" viewBox="0 0 24 24">
                          <path
                            fill="#E01E5A"
                            d="M5.04 14.76a2.52 2.52 0 1 0-2.52 2.52h2.52v-2.52zm1.26 0a2.52 2.52 0 0 0 5.04 0v-6.3a2.52 2.52 0 1 0-5.04 0v6.3z"
                          />
                          <path
                            fill="#36C5F0"
                            d="M9.24 5.04a2.52 2.52 0 1 0 2.52-2.52v2.52H9.24zm0 1.26a2.52 2.52 0 0 0 0 5.04h6.3a2.52 2.52 0 1 0 0-5.04h-6.3z"
                          />
                          <path
                            fill="#2EB67D"
                            d="M18.96 9.24a2.52 2.52 0 1 0 2.52-2.52h-2.52v2.52zm-1.26 0a2.52 2.52 0 0 0-5.04 0v6.3a2.52 2.52 0 1 0 5.04 0v-6.3z"
                          />
                          <path
                            fill="#ECB22E"
                            d="M14.76 18.96a2.52 2.52 0 1 0-2.52 2.52v-2.52h2.52zm0-1.26a2.52 2.52 0 0 0 0-5.04h-6.3a2.52 2.52 0 1 0 0 5.04h6.3z"
                          />
                        </svg>
                      ),
                    },
                    {
                      name: "OpenAI",
                      icon: (
                        <svg
                          className="size-4 fill-emerald-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.771-4.205 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.746-7.074z" />
                        </svg>
                      ),
                    },
                    {
                      name: "Anthropic",
                      icon: (
                        <svg
                          className="size-4"
                          viewBox="0 0 24 24"
                          fill="#D97757"
                        >
                          <path d="M17.472 2.56h-3.99L20.89 21.44h4.015L17.472 2.56zm-10.944 0L0 21.44h4.032l1.632-4.992h7.32l1.632 4.992h4.032L12.112 2.56H6.528zm2.496 10.656 2.376-7.272 2.376 7.272H9.024z" />
                        </svg>
                      ),
                    },
                    {
                      name: "AWS",
                      icon: (
                        <svg
                          className="size-4"
                          viewBox="0 0 24 24"
                          fill="#FF9900"
                        >
                          <path d="M12.924 16.92c-2.316 0-3.66-1.092-3.66-2.964 0-2.28 1.932-3.216 4.992-3.216.744 0 1.488.048 2.148.144v.672c0 1.98-.984 5.364-3.48 5.364zm3.6-8.856c-.84-.336-2.064-.528-3.444-.528-3.684 0-6.192 1.92-6.192 5.256 0 3.252 2.184 5.112 5.616 5.112 1.584 0 2.892-.384 3.756-.936l-.372 1.836c-1.02.432-2.328.696-3.804.696-4.524 0-7.584-2.616-7.584-6.84 0-4.308 3.324-6.936 8.232-6.936 1.764 0 3.324.348 4.2.828l-.408 1.512zm7.476 13.908C21.72 23.364 16.296 25 10.848 25 4.8 25 .828 22.848.06 22.308c-.144-.096-.156-.252-.024-.36l1.248-1.032c.12-.096.264-.072.432.036.72.468 4.14 2.22 9.132 2.22 4.476 0 9.072-1.392 11.232-2.736.216-.132.396.06.12.336z" />
                        </svg>
                      ),
                    },
                    {
                      name: "PostgreSQL",
                      icon: (
                        <svg
                          className="size-4"
                          viewBox="0 0 24 24"
                          fill="#336791"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.2 17.5c-3.1 0-5.6-2.2-6.1-5.1h2.1c.4 1.8 2 3.1 3.9 3.1 2.2 0 4-1.8 4-4s-1.8-4-4-4c-1.3 0-2.4.6-3.1 1.6l-1.6-1.2C9.4 8.6 11 7.5 13.1 7.5c3.6 0 6.5 2.9 6.5 6.5s-2.8 5.5-6.4 5.5z" />
                        </svg>
                      ),
                    },
                  ]
                    .concat([
                      {
                        name: "GitHub",
                        icon: (
                          <svg
                            className="size-4 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                        ),
                      },
                      {
                        name: "GitLab",
                        icon: (
                          <svg className="size-4" viewBox="0 0 24 24">
                            <path
                              fill="#E24329"
                              d="m12 18.06-4.575-14.08h9.15L12 18.06Z"
                            />
                            <path
                              fill="#FC6D26"
                              d="M12 18.06 7.425 3.98H2.16L12 18.06Z"
                            />
                            <path
                              fill="#FCA326"
                              d="m2.16 3.98-1.92 5.91a.88.88 0 0 0 .32.99L12 18.06 2.16 3.98Z"
                            />
                            <path
                              fill="#E24329"
                              d="M2.16 3.98h5.265L4.79 11.83 2.16 3.98Z"
                            />
                            <path
                              fill="#FC6D26"
                              d="M12 18.06 16.575 3.98h5.265L12 18.06Z"
                            />
                            <path
                              fill="#FCA326"
                              d="m21.84 3.98 1.92 5.91a.88.88 0 0 1-.32.99L12 18.06 21.84 3.98Z"
                            />
                            <path
                              fill="#E24329"
                              d="M21.84 3.98h-5.265l2.635 7.85 2.63-7.85Z"
                            />
                          </svg>
                        ),
                      },
                      {
                        name: "Google Workspace",
                        icon: (
                          <svg className="size-4" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24Z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.28 14.27a7.2 7.2 0 0 1 0-4.54V6.58H1.25a11.96 11.96 0 0 0 0 10.84l4.03-3.15Z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                            />
                          </svg>
                        ),
                      },
                      {
                        name: "HubSpot",
                        icon: (
                          <svg
                            className="size-4"
                            viewBox="0 0 24 24"
                            fill="#FF7A59"
                          >
                            <path d="M18.8 8.1V5.7c.8-.4 1.4-1.2 1.4-2.2 0-1.4-1.1-2.5-2.5-2.5S15.2 2.1 15.2 3.5c0 1 .6 1.8 1.4 2.2v2.4c-1.1.4-2 1.2-2.4 2.3l-5.6-4.3c.1-.4.1-.7.1-1.1 0-2-1.6-3.5-3.5-3.5S1.7 3 1.7 5s1.6 3.5 3.5 3.5c.6 0 1.2-.2 1.7-.5l5.5 4.3c-.6 1.1-.7 2.4-.2 3.6l-3.3 2.1c-.5-.4-1.1-.6-1.7-.6-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3c0-.3 0-.5-.1-.7l3.3-2.1c1.2.9 2.9 1 4.2.3 1.3-.7 2.1-2.1 2.1-3.6 0-.8-.2-1.5-.6-2.1l2.8-1.8c.6.5 1.4.8 2.2.8 1.9 0 3.5-1.6 3.5-3.5 0-2-1.6-3.5-3.5-3.5-1.5 0-2.8 1-3.3 2.4z" />
                          </svg>
                        ),
                      },
                      {
                        name: "Jira",
                        icon: (
                          <svg
                            className="size-4"
                            viewBox="0 0 24 24"
                            fill="#0052CC"
                          >
                            <path d="M11.571 11.429h-8.08c-.78 0-1.414-.634-1.414-1.414s.634-1.415 1.414-1.415h8.08v2.829zm0-5.715H2.077c-.78 0-1.414-.633-1.414-1.414s.634-1.414 1.414-1.414h9.494v2.828zm11.766 5.715H15.26c-.78 0-1.414-.634-1.414-1.414s.634-1.415 1.414-1.415h8.077v2.829zm0-5.715h-9.49c-.78 0-1.415-.633-1.415-1.414s.634-1.414 1.415-1.414h9.49v2.828zM11.571 22.857H.663c-.78 0-1.414-.633-1.414-1.414s.634-1.414 1.414-1.414h10.908v2.828zm11.766 0h-9.49c-.78 0-1.415-.633-1.415-1.414s.634-1.414 1.415-1.414h9.49v2.828zm-11.766-5.714H3.49c-.78 0-1.414-.634-1.414-1.414s.634-1.415 1.414-1.415h8.08v2.829zm11.766 0h-8.077c-.78 0-1.414-.634-1.414-1.414s.634-1.415 1.414-1.415h8.077v2.829z" />
                          </svg>
                        ),
                      },
                      {
                        name: "Linear",
                        icon: (
                          <svg
                            className="size-4"
                            viewBox="0 0 24 24"
                            fill="#5E6AD2"
                          >
                            <path d="M3.18 2.05a1.5 1.5 0 0 0-.82 1.34v17.22a1.5 1.5 0 0 0 2.45 1.15l15.5-13.3a1.5 1.5 0 0 0 .15-2.13L5.4 2.37a1.5 1.5 0 0 0-2.22-.32Z" />
                            <path d="M12.5 14.8 4.2 21.9a1.5 1.5 0 0 0 1.95.12l14.4-11.2-8.05 4Z" />
                          </svg>
                        ),
                      },
                      {
                        name: "Stripe",
                        icon: (
                          <svg
                            className="size-4"
                            viewBox="0 0 24 24"
                            fill="#635BFF"
                          >
                            <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.52.5 6.05.5 2.115 3.86 2.115 8.877c0 7.828 10.75 6.577 10.75 9.96 0 .993-.868 1.47-2.072 1.47-2.61 0-5.46-1.259-7.227-2.246l-.92 5.56C4.462 24.58 7.327 25.5 10.82 25.5c6.808 0 11.065-3.356 11.065-8.528 0-8.236-10.75-6.85-10.75-9.96 0-.868.744-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494z" />
                          </svg>
                        ),
                      },
                    ])
                    .map((item, idx) => (
                      <div
                        key={`${item.name}-${idx}`}
                        className="inline-flex items-center gap-2.5 rounded-xl border border-border/70 bg-card/60 px-4 py-2 text-xs font-medium text-foreground shadow-xs hover:border-foreground/30 hover:bg-card transition-all cursor-default shrink-0"
                      >
                        {item.icon}
                        <span className="font-semibold tracking-tight">
                          {item.name}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Marquee Row 2: Backed & Trusted By */}
              <div className="mt-4 relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] py-2">
                <div
                  className="animate-marquee flex items-center gap-4"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "35s",
                  }}
                >
                  {[
                    {
                      name: "Y Combinator",
                      badge: "Y",
                      color: "bg-[#FF6600] text-white",
                    },
                    {
                      name: "Tesla",
                      badge: "T",
                      color: "bg-red-600 text-white",
                    },
                    {
                      name: "NVIDIA Inception",
                      badge: "NV",
                      color: "bg-[#76B900] text-black font-bold",
                    },
                    {
                      name: "Robinhood",
                      badge: "RH",
                      color: "bg-black text-[#00C805] dark:bg-zinc-800",
                    },
                    {
                      name: "Great Wave Ventures",
                      badge: "GW",
                      color: "bg-blue-600 text-white",
                    },
                    {
                      name: "Georgia Tech",
                      badge: "GT",
                      color: "bg-[#B3A369] text-black font-bold",
                    },
                    {
                      name: "University of Chicago",
                      badge: "UC",
                      color: "bg-[#800000] text-white",
                    },
                  ]
                    .concat([
                      {
                        name: "Y Combinator",
                        badge: "Y",
                        color: "bg-[#FF6600] text-white",
                      },
                      {
                        name: "Tesla",
                        badge: "T",
                        color: "bg-red-600 text-white",
                      },
                      {
                        name: "NVIDIA Inception",
                        badge: "NV",
                        color: "bg-[#76B900] text-black font-bold",
                      },
                      {
                        name: "Robinhood",
                        badge: "RH",
                        color: "bg-black text-[#00C805] dark:bg-zinc-800",
                      },
                      {
                        name: "Great Wave Ventures",
                        badge: "GW",
                        color: "bg-blue-600 text-white",
                      },
                      {
                        name: "Georgia Tech",
                        badge: "GT",
                        color: "bg-[#B3A369] text-black font-bold",
                      },
                      {
                        name: "University of Chicago",
                        badge: "UC",
                        color: "bg-[#800000] text-white",
                      },
                    ])
                    .map((team, idx) => (
                      <div
                        key={`${team.name}-${idx}`}
                        className="inline-flex items-center gap-2.5 rounded-xl border border-border/70 bg-card/60 px-4 py-2 text-xs font-medium text-muted-foreground shadow-xs hover:text-foreground hover:border-foreground/30 hover:bg-card transition-all cursor-default shrink-0"
                      >
                        <span
                          className={`flex size-5 items-center justify-center rounded-md text-[10px] ${team.color}`}
                        >
                          {team.badge}
                        </span>
                        <span className="font-semibold">{team.name}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ecosystem Video Section */}
        <section id="product" className="py-24 bg-muted/10 border-t">
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <span className="text-emerald-500 dark:text-emerald-400 font-extrabold text-2xl sm:text-3xl block mb-1">
              Every Agent.
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-foreground">
              One Unified Gateway
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-16">
              Scoped credentials injected per request. Agents never hold a real
              secret.
            </p>

            <div className="mx-auto max-w-5xl rounded-xl overflow-hidden border bg-card shadow-sm">
              <ThemedVideo
                lightSrc="/onecli-ecosystem-light.mp4"
                darkSrc="/onecli-ecosystem-dark.mp4"
              />
            </div>
          </div>
        </section>

        {/* Rules / Policy Video Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <span className="text-emerald-500 dark:text-emerald-400 font-extrabold text-2xl sm:text-3xl block mb-1">
                Network Shield
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4 text-foreground">
                Rules Agents Can&apos;t Break
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Prompts are suggestions. AgentVault policies are enforced at the
                network layer, outside the agent, outside the LLM. No matter
                what the model decides, the proxy enforces your rules
                deterministically.
              </p>
            </div>

            <div className="mx-auto max-w-5xl rounded-xl overflow-hidden border bg-card shadow-sm mb-12">
              <ThemedVideo
                lightSrc="/onecli-coding-agents-light.mp4"
                darkSrc="/onecli-policy-dark.mp4"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
              <div className="rounded-xl border bg-card p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Block endpoints</h3>
                <p className="text-muted-foreground">
                  Prevent agents from calling specific APIs (DELETE /repos, POST
                  /payments, or any path you define). Enforced at the proxy, not
                  a suggestion.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Rate limit per agent</h3>
                <p className="text-muted-foreground">
                  Cap how many requests an agent can make per minute, hour, or
                  day. Stop runaway loops before they cause damage.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Require approval</h3>
                <p className="text-muted-foreground">
                  Flag sensitive operations for human review before they go
                  through. Agents wait, you decide.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Scope per project</h3>
                <p className="text-muted-foreground">
                  Each agent only accesses the credentials and services assigned
                  to its project. No cross-project leakage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What teams build with AgentVault */}
        <section className="py-24 bg-muted/10 border-y">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                What teams build with AgentVault
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
              {/* Coding Agents */}
              <div className="rounded-xl border bg-card p-8 shadow-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Code2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Coding Agents</h3>
                <p className="text-muted-foreground mb-6">
                  Your Cursor or Claude agent pushes to GitHub, creates Jira
                  tickets, and deploys to Vercel, all through AgentVault&apos;s
                  gateway. Credentials injected, never exposed.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md border px-3 py-1 text-xs font-mono font-medium text-muted-foreground">
                    GITHUB
                  </span>
                  <span className="rounded-md border px-3 py-1 text-xs font-mono font-medium text-muted-foreground">
                    JIRA
                  </span>
                  <span className="rounded-md border px-3 py-1 text-xs font-mono font-medium text-muted-foreground">
                    VERCEL
                  </span>
                  <span className="rounded-md border px-3 py-1 text-xs font-mono font-medium text-muted-foreground">
                    LINEAR
                  </span>
                </div>
              </div>

              {/* Autonomous Workflows */}
              <div className="rounded-xl border bg-card p-8 shadow-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Link2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Autonomous Workflows</h3>
                <p className="text-muted-foreground mb-6">
                  n8n, Dify, or custom pipelines call Slack, Google Calendar,
                  and Stripe APIs. AgentVault injects OAuth tokens per-request.
                  Revoke access instantly.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md border px-3 py-1 text-xs font-mono font-medium text-muted-foreground">
                    SLACK
                  </span>
                  <span className="rounded-md border px-3 py-1 text-xs font-mono font-medium text-muted-foreground">
                    GOOGLE CALENDAR
                  </span>
                  <span className="rounded-md border px-3 py-1 text-xs font-mono font-medium text-muted-foreground">
                    STRIPE
                  </span>
                  <span className="rounded-md border px-3 py-1 text-xs font-mono font-medium text-muted-foreground">
                    GMAIL
                  </span>
                </div>
              </div>

              {/* Team Governance */}
              <div className="rounded-xl border bg-card p-8 shadow-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Team Governance</h3>
                <p className="text-muted-foreground mb-6">
                  10 agents across 3 projects. Rate limits on the Slack API,
                  approval rules for payment endpoints, full audit logs. One
                  dashboard.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md border px-3 py-1 text-xs font-mono font-medium text-muted-foreground">
                    MULTI-AGENT
                  </span>
                  <span className="rounded-md border px-3 py-1 text-xs font-mono font-medium text-muted-foreground">
                    RATE LIMITS
                  </span>
                  <span className="rounded-md border px-3 py-1 text-xs font-mono font-medium text-muted-foreground">
                    APPROVALS
                  </span>
                  <span className="rounded-md border px-3 py-1 text-xs font-mono font-medium text-muted-foreground">
                    AUDIT LOGS
                  </span>
                </div>
              </div>

              {/* Security & Compliance */}
              <div className="rounded-xl border bg-card p-8 shadow-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Security &amp; Compliance
                </h3>
                <p className="text-muted-foreground mb-6">
                  Show exactly which agent called which API, when, and what
                  credentials were used. No keys in logs, no keys in prompts.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md border px-3 py-1 text-xs font-mono font-medium text-muted-foreground">
                    SOC 2
                  </span>
                  <span className="rounded-md border px-3 py-1 text-xs font-mono font-medium text-muted-foreground">
                    AUDIT TRAIL
                  </span>
                  <span className="rounded-md border px-3 py-1 text-xs font-mono font-medium text-muted-foreground">
                    REVOCATION
                  </span>
                  <span className="rounded-md border px-3 py-1 text-xs font-mono font-medium text-muted-foreground">
                    ZERO-TRUST
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof / Problem */}
        <section className="py-24 relative overflow-hidden bg-math-grid border-y">
          {/* Subtle Ambient Radial Light */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,57,53,0.05),transparent_65%)] dark:bg-[radial-gradient(circle_at_center,rgba(229,57,53,0.08),transparent_65%)]" />

          <div className="container relative mx-auto max-w-6xl px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/25 bg-rose-500/10 px-3.5 py-1 text-xs font-semibold text-rose-500 mb-6 shadow-xs backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Real-World Security Incident</span>
            </div>

            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-3 text-foreground leading-[1.12] text-balance">
              It happened to{" "}
              <span className="font-handwriting text-[#E53935] dark:text-[#F87171] text-[1.25em] font-normal inline-block -rotate-2">
                her.
              </span>
            </h2>
            <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl mb-12 leading-[1.12] text-foreground text-balance">
              It won&apos;t happen to{" "}
              <span className="text-[#00B050] dark:text-[#34D399] font-extrabold">
                you.
              </span>
            </h3>

            <div className="mx-auto max-w-2xl text-left">
              {/* Incident Post Card */}
              <div className="rounded-2xl border border-border/80 bg-card/95 shadow-2xl p-6 sm:p-7 backdrop-blur-md transition-all hover:border-zinc-700/80">
                {/* Author Bar */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-linear-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-xs">
                      N
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-sm text-foreground">
                        <span>NIK</span>
                        <svg
                          className="size-3.5 text-sky-500 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        @ns123abc · Feb 24
                      </div>
                    </div>
                  </div>
                  <svg
                    className="size-4.5 text-muted-foreground/60 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>

                {/* Post Title */}
                <p className="font-sans mb-4 text-base sm:text-[17px] font-semibold text-foreground leading-snug">
                  META&apos;s head of AI safety and alignment gets her emails
                  nuked by OpenClaw
                </p>

                {/* Greentext Dialogue Box */}
                <div className="rounded-xl border border-zinc-800/80 bg-[#0c1017] p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-zinc-300 space-y-2">
                  <p className="text-emerald-400 font-medium">
                    <span className="text-emerald-500/60 select-none mr-1.5">
                      &gt;
                    </span>
                    be director of AI Safety and Alignment at Meta
                  </p>
                  <p className="text-emerald-400 font-medium">
                    <span className="text-emerald-500/60 select-none mr-1.5">
                      &gt;
                    </span>
                    install OpenClaw
                  </p>
                  <p className="text-emerald-400 font-medium">
                    <span className="text-emerald-500/60 select-none mr-1.5">
                      &gt;
                    </span>
                    give it unrestricted access to personal emails
                  </p>
                  <p className="text-rose-400 font-semibold">
                    <span className="text-rose-500/60 select-none mr-1.5">
                      &gt;
                    </span>
                    it starts nuking emails
                  </p>
                  <p className="text-zinc-100 font-medium bg-zinc-800/40 px-2 py-0.5 rounded">
                    <span className="text-zinc-400 select-none mr-1.5">
                      &gt;
                    </span>
                    &quot;Do not do that&quot;
                  </p>
                  <p className="text-rose-400 italic">
                    <span className="text-rose-500/60 select-none mr-1.5">
                      &gt;
                    </span>
                    *keeps going*
                  </p>
                  <p className="text-zinc-100 font-medium bg-zinc-800/40 px-2 py-0.5 rounded">
                    <span className="text-zinc-400 select-none mr-1.5">
                      &gt;
                    </span>
                    &quot;Stop don&apos;t do anything&quot;
                  </p>
                  <p className="text-rose-400 italic font-semibold">
                    <span className="text-rose-500/60 select-none mr-1.5">
                      &gt;
                    </span>
                    *gets all remaining old stuff and nukes it aswell*
                  </p>
                  <p className="text-amber-300 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                    <span className="text-amber-400 select-none mr-1.5">
                      &gt;
                    </span>
                    &quot;STOP OPENCLAW&quot;
                  </p>
                  <p className="text-zinc-200">
                    <span className="text-zinc-500 select-none mr-1.5">
                      &gt;
                    </span>
                    &quot;I asked you to not do that&quot;
                  </p>
                  <p className="text-zinc-200">
                    <span className="text-zinc-500 select-none mr-1.5">
                      &gt;
                    </span>
                    &quot;do you remember that?&quot;
                  </p>
                  <p className="text-amber-400 font-semibold bg-zinc-800/60 px-2 py-0.5 rounded border-l-2 border-amber-400">
                    <span className="text-zinc-500 select-none mr-1.5">
                      &gt;
                    </span>
                    &quot;Yes I remember. And I violated it.&quot;
                  </p>
                  <p className="text-zinc-300">
                    <span className="text-zinc-500 select-none mr-1.5">
                      &gt;
                    </span>
                    &quot;You&apos;re right to be upset&quot;
                  </p>
                </div>

                {/* Engagement Metrics */}
                <div className="mt-5 flex items-center justify-between text-muted-foreground text-xs font-mono border-t border-border/70 pt-4">
                  <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                    <BarChart3 className="size-3.5" /> 2.8M views
                  </span>
                  <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                    <MessageCircle className="size-3.5" /> 1.2K replies
                  </span>
                  <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                    <Repeat2 className="size-3.5" /> 3.3K reposts
                  </span>
                  <span className="flex items-center gap-1.5 text-rose-500 font-medium hover:text-rose-600 transition-colors">
                    <Heart className="size-3.5 fill-current" /> 29K likes
                  </span>
                </div>
              </div>

              {/* Solution Contrast Box */}
              <div className="mt-8 rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-6 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-2 text-emerald-500 dark:text-emerald-400 font-semibold text-sm">
                  <ShieldCheck className="size-4.5" />
                  <span>How AgentVault Prevents This</span>
                </div>
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed mb-4">
                  With AgentVault, agents call APIs through a gateway that
                  injects credentials at the network layer. They never see a
                  key, and you control exactly what they can access.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-emerald-500/20 text-xs font-mono">
                  <div className="flex items-center gap-2 text-rose-500 dark:text-rose-400">
                    <span className="font-bold">✕ Without Vault:</span> Prompts
                    ignored by model
                  </div>
                  <div className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400">
                    <span className="font-bold">✓ With Vault:</span> 403 Blocked
                    at proxy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="pricing"
          className="py-28 relative overflow-hidden bg-math-grid border-t"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.16),transparent_70%)]" />
          <div className="container relative mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6 text-foreground leading-[1.12] text-balance">
              Start securing your agents today
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed text-balance">
              Free forever for up to 2 agents. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/login"
                className="inline-flex h-13 w-full sm:w-auto items-center justify-center rounded-xl bg-brand px-10 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:bg-brand/90 hover:shadow-md hover:scale-[1.02]"
              >
                Get Started
              </Link>
              <Link
                href="https://github.com/manishpatel00/Onecli-AgentVault#readme"
                target="_blank"
                className="inline-flex h-13 w-full sm:w-auto items-center justify-center rounded-xl border border-input bg-card/60 px-10 text-base font-semibold text-foreground shadow-xs transition-all hover:bg-accent hover:text-accent-foreground hover:scale-[1.02]"
              >
                Read the Docs
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/20 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link
                href="/"
                className="mb-4 inline-block font-semibold text-xl"
              >
                AgentVault
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs mb-6">
                The open-source trust layer for AI agents. Keys never leave the
                vault.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                All systems operational
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#product" className="hover:text-foreground">
                    Product
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/auth/login" className="hover:text-foreground">
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Compare</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    vs HashiCorp Vault
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    vs Infisical
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    vs LiteLLM
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    All comparisons
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t pt-8 text-sm text-muted-foreground">
            <p>&copy; 2026 AgentVault</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <Link href="#" className="hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
