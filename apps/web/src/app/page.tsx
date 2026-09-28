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
  Terminal,
  Cpu,
  Github,
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
        <section className="relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32">
          {/* Subtle Ambient Radial Glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(16,185,129,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(16,185,129,0.18),transparent_70%)]" />
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

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
              The credential gateway <br className="hidden sm:block" />
              for AI agents
            </h1>

            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed text-balance">
              Route every request through AgentVault. Enforce granular policies,
              inject credentials at the network layer. Keys never touch the
              agent.
            </p>

            {/* Code Mockup Card */}
            <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl mb-12 transition-all hover:border-border">
              <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground font-mono ml-2">
                    <Terminal className="size-3.5" />
                    .env — proxied by agentvault
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
                  aria-label="Copy code"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-medium">
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
              <div className="p-5 text-left font-mono text-sm sm:text-base bg-[#0d1117] text-zinc-300 overflow-x-auto">
                <div className="flex justify-between items-center py-1.5 group hover:bg-zinc-800/30 px-2 rounded">
                  <span>
                    <span className="text-[#79c0ff]">OPENAI_API_KEY</span>
                    =sk-proj-Xh4mQ2████████f8Kw
                  </span>
                  <span className="text-[#3fb950] text-xs flex items-center gap-1 bg-[#2ea043]/10 px-2 py-0.5 rounded">
                    <Check className="h-3 w-3" /> agentvault-managed
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 group hover:bg-zinc-800/30 px-2 rounded">
                  <span>
                    <span className="text-[#79c0ff]">STRIPE_SECRET_KEY</span>
                    =sk_live_51Hx8m████████Rq2v
                  </span>
                  <span className="text-[#3fb950] text-xs flex items-center gap-1 bg-[#2ea043]/10 px-2 py-0.5 rounded opacity-0 transition-opacity group-hover:opacity-100">
                    <Check className="h-3 w-3" /> agentvault-managed
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 group hover:bg-zinc-800/30 px-2 rounded">
                  <span>
                    <span className="text-[#79c0ff]">GITHUB_TOKEN</span>
                    =ghp_uV4nR7Tk████████p3Xz
                  </span>
                  <span className="text-[#3fb950] text-xs flex items-center gap-1 bg-[#2ea043]/10 px-2 py-0.5 rounded">
                    <Check className="h-3 w-3" /> agentvault-managed
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 group hover:bg-zinc-800/30 px-2 rounded">
                  <span>
                    <span className="text-[#79c0ff]">
                      AWS_SECRET_ACCESS_KEY
                    </span>
                    =aK9dPmXw████████L7Rq
                  </span>
                  <span className="text-[#3fb950] text-xs flex items-center gap-1 bg-[#2ea043]/10 px-2 py-0.5 rounded opacity-0 transition-opacity group-hover:opacity-100">
                    <Check className="h-3 w-3" /> agentvault-managed
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 group hover:bg-zinc-800/30 px-2 rounded">
                  <span>
                    <span className="text-[#79c0ff]">DATABASE_URL</span>
                    =postgres://acme:pg4s█████@db.acme.io
                  </span>
                  <span className="text-[#3fb950] text-xs flex items-center gap-1 bg-[#2ea043]/10 px-2 py-0.5 rounded opacity-0 transition-opacity group-hover:opacity-100">
                    <Check className="h-3 w-3" /> agentvault-managed
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 group hover:bg-zinc-800/30 px-2 rounded">
                  <span>
                    <span className="text-[#79c0ff]">SLACK_BOT_TOKEN</span>
                    =xoxb-8214-Ju7wK████████m2Np
                  </span>
                  <span className="text-[#3fb950] text-xs flex items-center gap-1 bg-[#2ea043]/10 px-2 py-0.5 rounded opacity-0 transition-opacity group-hover:opacity-100">
                    <Check className="h-3 w-3" /> agentvault-managed
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 group hover:bg-zinc-800/30 px-2 rounded">
                  <span>
                    <span className="text-[#79c0ff]">ANTHROPIC_API_KEY</span>
                    =sk-ant-api03-R5kT████████v8Nq
                  </span>
                  <span className="text-[#3fb950] text-xs flex items-center gap-1 bg-[#2ea043]/10 px-2 py-0.5 rounded">
                    <Check className="h-3 w-3" /> agentvault-managed
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-800/80 text-zinc-400 flex flex-col sm:flex-row justify-between items-center gap-2">
                  <span className="text-xs">
                    Ready for Cursor, Claude Code, LangChain &amp; n8n
                  </span>
                  <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                    <CheckCircle2 className="size-3.5" /> 0 secrets exposed to
                    models
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

            {/* Supported Environments Badges */}
            <div className="pt-6 border-t border-border/40">
              <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-4">
                Seamlessly Integrates With
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  "Cursor",
                  "Claude Code",
                  "OpenAI",
                  "Anthropic",
                  "LangChain",
                  "Dify",
                  "n8n",
                  "AutoGPT",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/40 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors cursor-default"
                  >
                    <Cpu className="size-3 text-emerald-500" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ecosystem Video Section */}
        <section id="product" className="py-24 bg-muted/10 border-t">
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Every agent. <span className="text-brand">One gateway.</span>
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
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Rules agents can&apos;t break
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
        <section className="py-24 bg-muted/10 border-y">
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
              It happened to her.
            </h2>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-brand">
              It won&apos;t happen to you.
            </h2>

            <div className="mx-auto max-w-2xl text-left">
              <div className="rounded-xl border bg-card shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-zinc-800 dark:bg-zinc-700 flex items-center justify-center text-white font-bold">
                    N
                  </div>
                  <div>
                    <div className="font-bold text-sm">NIK</div>
                    <div className="text-xs text-muted-foreground">
                      @ns123abc
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm font-mono text-zinc-800 dark:text-zinc-300">
                  <p className="font-sans mb-3 text-base font-medium">
                    META&apos;s head of AI safety and alignment gets her emails
                    nuked by OpenClaw
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400">
                    {">"}be director of AI Safety and Alignment at Meta
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400">
                    {">"}install OpenClaw
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400">
                    {">"}give it unrestricted access to personal emails
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400">
                    {">"}it starts nuking emails
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400">
                    {">"}&quot;Do not do that&quot;
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400">
                    {">"}*keeps going*
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400">
                    {">"}&quot;Stop don&apos;t do anything&quot;
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400">
                    {">"}*gets all remaining old stuff and nukes it aswell*
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400">
                    {">"}&quot;STOP OPENCLAW&quot;
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400">
                    {">"}&quot;I asked you to not do that&quot;
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400">
                    {">"}&quot;do you remember that?&quot;
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400">
                    {">"}&quot;Yes I remember. And I violated it.&quot;
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400">
                    {">"}&quot;You&apos;re right to be upset&quot;
                  </p>
                </div>
                <div className="mt-6 flex gap-4 text-muted-foreground text-xs font-medium border-t pt-4">
                  <span>2.8M views</span>
                  <span>29K likes</span>
                  <span>3.3K retweets</span>
                </div>
              </div>
            </div>

            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mt-12">
              With AgentVault, agents call APIs through a gateway that injects
              credentials at the network layer. They never see a key, and you
              control exactly what they can access.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section id="pricing" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand/5" />
          <div className="container relative mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Start securing your agents today
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Free forever for up to 2 agents. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/login"
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-md bg-brand px-10 text-lg font-medium text-primary-foreground shadow transition-colors hover:bg-brand/90"
              >
                Get Started
              </Link>
              <Link
                href="https://github.com/manishpatel00/Onecli-AgentVault#readme"
                target="_blank"
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-md border border-input bg-background px-10 text-lg font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
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
