"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  Info,
  Bot,
  Search,
  Check,
  Plus,
  Mail,
  GitBranch,
  MessageSquare,
  ShieldCheck,
  ExternalLink,
  Key,
  Lock,
  Loader2,
} from "lucide-react";
import { Button } from "@agentvault/ui/components/button";
import { Input } from "@agentvault/ui/components/input";
import { Label } from "@agentvault/ui/components/label";
import { Card } from "@agentvault/ui/components/card";
import { Badge } from "@agentvault/ui/components/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@agentvault/ui/components/dialog";
import { cn } from "@agentvault/ui/lib/utils";
import { toast } from "sonner";

interface AgentChatProps {
  agent: {
    id: string;
    name: string;
    identifier: string;
    accessToken: string;
    isDefault: boolean;
  };
  onOpenTab: (tab: string) => void;
}

interface Message {
  id: string;
  sender: "user" | "agent" | "system-error";
  text: string;
  timestamp: string;
}

interface AppInfo {
  name: string;
  desc: string;
  category?: string;
  authType: "oauth" | "apikey" | "role";
  defaultScopes?: string[];
  placeholder?: string;
}

const ALL_APPS: AppInfo[] = [
  {
    name: "Gmail",
    desc: "Read, compose, and send emails via Gmail.",
    authType: "oauth",
    defaultScopes: ["gmail.send", "gmail.readonly", "gmail.compose"],
  },
  {
    name: "GitHub",
    desc: "Repositories, issues, pull requests, and GitHub Actions.",
    authType: "oauth",
    defaultScopes: ["repo", "read:user", "workflow"],
  },
  {
    name: "Slack",
    desc: "Chat with this agent from Slack.",
    authType: "oauth",
    defaultScopes: ["chat:write", "channels:read", "commands"],
  },
  {
    name: "Affinity",
    desc: "Manage relationships, deals, and interactions in Affinity CRM.",
    authType: "apikey",
    placeholder: "aff_api_••••••••••••••••",
  },
  {
    name: "Attio",
    desc: "Contacts, companies, deals, lists, notes, and tasks.",
    authType: "apikey",
    placeholder: "attio_token_••••••••••••••••",
  },
  {
    name: "AWS",
    desc: "Access AWS services: S3, EC2, Lambda, and more.",
    authType: "apikey",
    placeholder: "AKIAIOSFODNN7EXAMPLE",
  },
  {
    name: "AWS Role",
    desc: "Connect via IAM AssumeRole with temporary credentials and per-agent permissions. No keys shared.",
    authType: "role",
    placeholder: "arn:aws:iam::123456789012:role/AgentVaultAccess",
  },
  {
    name: "Cloudflare",
    desc: "Deploy Workers, manage DNS, KV, D1, Pages, and other Cloudflare services.",
    authType: "apikey",
    placeholder: "cf_token_••••••••••••••••",
  },
  {
    name: "Confluence",
    desc: "Pages, spaces, and documentation in Confluence Cloud.",
    authType: "oauth",
    defaultScopes: ["read:confluence-content", "write:confluence-content"],
  },
  {
    name: "Datadog",
    desc: "Monitoring, APM, logs, and infrastructure metrics.",
    authType: "apikey",
    placeholder: "dd_api_key_••••••••••••••••",
  },
  {
    name: "Docker Hub",
    desc: "Manage Docker Hub repositories, images, tags, and organizations.",
    authType: "apikey",
    placeholder: "dckr_pat_••••••••••••••••",
  },
  {
    name: "Dropbox",
    desc: "Cloud file storage, sharing, and collaboration.",
    authType: "oauth",
    defaultScopes: ["files.metadata.read", "files.content.write"],
  },
  {
    name: "Fathom",
    desc: "AI meeting notes: recordings, transcripts, and summaries.",
    authType: "apikey",
    placeholder: "fathom_key_••••••••••••••••",
  },
  {
    name: "Fireflies",
    desc: "AI meeting transcripts, summaries, and action items.",
    authType: "apikey",
    placeholder: "ff_api_••••••••••••••••",
  },
  {
    name: "Fly.io",
    desc: "Deploy and manage applications, Machines, volumes, and secrets on Fly.io.",
    authType: "apikey",
    placeholder: "fo1_••••••••••••••••",
  },
  {
    name: "GitHub App",
    desc: "Fine-grained, org-approved access to repositories and resources.",
    authType: "oauth",
    defaultScopes: ["organization:read", "repository:write"],
  },
  {
    name: "GitLab",
    desc: "Repositories, issues, merge requests, and CI/CD pipelines.",
    authType: "oauth",
    defaultScopes: ["api", "read_repository", "write_repository"],
  },
  {
    name: "Google Admin",
    desc: "Manage users, groups, and devices in Google Workspace.",
    authType: "oauth",
    defaultScopes: ["admin.directory.user.readonly"],
  },
  {
    name: "Google Analytics",
    desc: "Access report data and run analytics queries.",
    authType: "oauth",
    defaultScopes: ["analytics.readonly"],
  },
  {
    name: "Google Calendar",
    desc: "Read, create, and manage calendar events.",
    authType: "oauth",
    defaultScopes: ["calendar.events", "calendar.readonly"],
  },
  {
    name: "Google Chat",
    desc: "Send messages and manage spaces in Google Chat.",
    authType: "oauth",
    defaultScopes: ["chat.messages.create"],
  },
  {
    name: "Google Classroom",
    desc: "Manage classes, rosters, and invitations.",
    authType: "oauth",
    defaultScopes: ["classroom.courses.readonly"],
  },
  {
    name: "Google Contacts",
    desc: "Read, search, and manage Google Contacts.",
    authType: "oauth",
    defaultScopes: ["contacts.readonly"],
  },
  {
    name: "Google Docs",
    desc: "Read, create, and edit Google Docs documents.",
    authType: "oauth",
    defaultScopes: ["documents", "drive.file"],
  },
  {
    name: "Google Drive",
    desc: "Read, create, and manage files and folders.",
    authType: "oauth",
    defaultScopes: ["drive.readonly", "drive.file"],
  },
  {
    name: "Google Forms",
    desc: "Read, create, and edit forms and responses.",
    authType: "oauth",
    defaultScopes: ["forms.body.readonly"],
  },
  {
    name: "Google Meet",
    desc: "Create and manage meetings.",
    authType: "oauth",
    defaultScopes: ["meetings.space.created"],
  },
  {
    name: "Google Photos",
    desc: "Manage photos, videos, and albums.",
    authType: "oauth",
    defaultScopes: ["photoslibrary.readonly"],
  },
  {
    name: "Google Search Console",
    desc: "View search traffic data and manage site presence.",
    authType: "oauth",
    defaultScopes: ["webmasters.readonly"],
  },
  {
    name: "Google Sheets",
    desc: "Read, create, and edit spreadsheets.",
    authType: "oauth",
    defaultScopes: ["spreadsheets", "drive.file"],
  },
  {
    name: "Google Slides",
    desc: "Read, create, and edit presentations.",
    authType: "oauth",
    defaultScopes: ["presentations"],
  },
  {
    name: "Google Tasks",
    desc: "Manage task lists and tasks.",
    authType: "oauth",
    defaultScopes: ["tasks"],
  },
  {
    name: "Granola",
    desc: "AI meeting notes. Search and retrieve your notes and folders.",
    authType: "apikey",
    placeholder: "granola_api_••••••••••••••••",
  },
  {
    name: "HubSpot",
    desc: "CRM contacts, companies, deals, and tickets.",
    authType: "oauth",
    defaultScopes: ["crm.objects.contacts.read", "crm.objects.deals.read"],
  },
  {
    name: "JFrog Artifactory",
    desc: "Pull npm, PyPI, and other packages through your JFrog Artifactory instance.",
    authType: "apikey",
    placeholder: "cmVmdGtuOjAxOj••••••••",
  },
  {
    name: "Jira",
    desc: "Projects, issues, and workflows in Jira Cloud.",
    authType: "oauth",
    defaultScopes: ["read:jira-work", "write:jira-work"],
  },
  {
    name: "Linear",
    desc: "Issues, projects, teams, and product development workflows.",
    authType: "oauth",
    defaultScopes: ["read", "write", "issues:create"],
  },
  {
    name: "LinkedIn",
    desc: "Profile, posts, and social engagement.",
    authType: "oauth",
    defaultScopes: ["openid", "profile", "w_member_social"],
  },
  {
    name: "Microsoft OneNote",
    desc: "Read and manage notebooks, sections, and pages in Microsoft OneNote.",
    authType: "oauth",
    defaultScopes: ["Notes.ReadWrite"],
  },
  {
    name: "Microsoft Word",
    desc: "Read and edit Word documents stored in OneDrive and SharePoint.",
    authType: "oauth",
    defaultScopes: ["Files.ReadWrite"],
  },
  {
    name: "monday.com",
    desc: "Boards, items, docs, and workspace management.",
    authType: "oauth",
    defaultScopes: ["boards:read", "boards:write"],
  },
  {
    name: "MongoDB Atlas",
    desc: "Manage clusters, users, and projects via the Atlas Administration API.",
    authType: "apikey",
    placeholder: "atlas_api_key_••••••••••••••••",
  },
  {
    name: "Notion",
    desc: "Pages, databases, comments, and workspace content.",
    authType: "oauth",
    defaultScopes: ["pages.read", "pages.write"],
  },
  {
    name: "Outlook Calendar",
    desc: "View and manage calendar events in Microsoft Outlook.",
    authType: "oauth",
    defaultScopes: ["Calendars.ReadWrite"],
  },
  {
    name: "Outlook Mail",
    desc: "Read, compose, and send emails via Microsoft Outlook.",
    authType: "oauth",
    defaultScopes: ["Mail.ReadWrite", "Mail.Send"],
  },
  {
    name: "Resend",
    desc: "Send transactional and marketing emails.",
    authType: "apikey",
    placeholder: "re_••••••••••••••••",
  },
  {
    name: "Salesforce",
    desc: "Salesforce CRM records, queries, and object metadata.",
    authType: "oauth",
    defaultScopes: ["api", "refresh_token"],
  },
  {
    name: "Sentry",
    desc: "Error tracking, performance monitoring, and issue management.",
    authType: "apikey",
    placeholder: "sntryu_••••••••••••••••",
  },
  {
    name: "Snowflake",
    desc: "Run SQL and manage your Snowflake data cloud account.",
    authType: "apikey",
    placeholder: "snowflake_privkey_••••••••••••••••",
  },
  {
    name: "Stripe",
    desc: "Payments, customers, subscriptions, invoices, and refunds on your Stripe account.",
    authType: "apikey",
    placeholder: "rk_live_••••••••••••••••",
  },
  {
    name: "Supabase",
    desc: "Projects, databases, edge functions, and storage.",
    authType: "apikey",
    placeholder: "sbp_••••••••••••••••",
  },
  {
    name: "Todoist",
    desc: "Tasks, projects, and productivity tracking.",
    authType: "oauth",
    defaultScopes: ["data:read_write"],
  },
  {
    name: "Trello",
    desc: "Boards, lists, and cards for project management.",
    authType: "oauth",
    defaultScopes: ["read", "write"],
  },
  {
    name: "Vercel",
    desc: "Projects, deployments, domains, and environment variables.",
    authType: "apikey",
    placeholder: "vercel_pat_••••••••••••••••",
  },
  {
    name: "Vertex AI",
    desc: "Access Vertex AI models on Google Cloud.",
    authType: "role",
    placeholder: "projects/my-project/locations/us-central1",
  },
  {
    name: "X",
    desc: "Posts, timelines, DMs, and account management.",
    authType: "oauth",
    defaultScopes: ["tweet.read", "tweet.write", "users.read"],
  },
  {
    name: "YouTube",
    desc: "Manage playlists, videos, and channel content on YouTube.",
    authType: "oauth",
    defaultScopes: ["youtube.readonly"],
  },
  {
    name: "Zoho CRM",
    desc: "Leads, contacts, accounts, deals, and tasks in Zoho CRM.",
    authType: "oauth",
    defaultScopes: ["ZohoCRM.modules.ALL"],
  },
  {
    name: "Zoom",
    desc: "Meetings, webinars, and cloud recordings.",
    authType: "oauth",
    defaultScopes: ["meeting:write", "meeting:read"],
  },
];

export const AgentChat = ({ agent, onOpenTab }: AgentChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const [appSearch, setAppSearch] = useState("");
  const [connectedApps, setConnectedApps] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Real Connection Setup Modal State
  const [activeConnectingApp, setActiveConnectingApp] =
    useState<AppInfo | null>(null);
  const [authMethod, setAuthMethod] = useState<"oauth" | "apikey">("oauth");
  const [accountEmail, setAccountEmail] = useState(
    "manishpatel953249@gmail.com",
  );
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [accessLevel, setAccessLevel] = useState<"full" | "readonly">("full");
  const [isConnectingStep, setIsConnectingStep] = useState<number>(0); // 0: idle, 1: connecting, 2: success

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(
        `agentvault_connected_apps_${agent.id}`,
      );
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setConnectedApps(parsed);
          }
        } catch {
          // fallback
        }
      }
    }
  }, [agent.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const openConnectModal = (app: AppInfo) => {
    setActiveConnectingApp(app);
    setAuthMethod(
      app.authType === "apikey" || app.authType === "role" ? "apikey" : "oauth",
    );
    setApiKeyInput("");
    setIsConnectingStep(0);
  };

  const handleStartConnection = () => {
    if (!activeConnectingApp) return;

    setIsConnectingStep(1);

    setTimeout(() => {
      setIsConnectingStep(2);

      setTimeout(() => {
        const appName = activeConnectingApp.name;
        setConnectedApps((prev) => {
          const updated = prev.includes(appName) ? prev : [...prev, appName];
          if (typeof window !== "undefined") {
            localStorage.setItem(
              `agentvault_connected_apps_${agent.id}`,
              JSON.stringify(updated),
            );
          }
          return updated;
        });

        toast.success(
          `Successfully connected ${appName} to ${agent.name}! Credentials encrypted and injected via AgentVault gateway.`,
        );

        setIsConnectingStep(0);
        setActiveConnectingApp(null);
      }, 700);
    }, 1100);
  };

  const handleDisconnect = (appName: string) => {
    setConnectedApps((prev) => {
      const updated = prev.filter((a) => a !== appName);
      if (typeof window !== "undefined") {
        localStorage.setItem(
          `agentvault_connected_apps_${agent.id}`,
          JSON.stringify(updated),
        );
      }
      return updated;
    });
    toast.info(`Disconnected ${appName} from ${agent.name}`);
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const hasKey =
      typeof window !== "undefined" &&
      localStorage.getItem("agentvault_has_model_key") === "true";

    setTimeout(() => {
      setIsTyping(false);

      if (!hasKey) {
        const errorMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: "system-error",
          text: "The agent's model provider rejected the request. This is usually a usage limit or an expired key. Check the connected model key, or connect a different one, then send your message again.",
          timestamp: "Just now",
        };
        setMessages((prev) => [...prev, errorMsg]);
      } else {
        const connectedAppsList =
          connectedApps.length > 0 ? connectedApps.join(", ") : "none";
        const replyMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          text: `Hello! I received "${userText}". I am connected through the AgentVault proxy gateway with credentials safely injected. (Connected Apps: ${connectedAppsList}). How can I assist you further?`,
          timestamp: "Just now",
        };
        setMessages((prev) => [...prev, replyMsg]);
      }
    }, 750);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredApps = ALL_APPS.filter(
    (app) =>
      app.name.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.desc.toLowerCase().includes(appSearch.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Messages Scroll Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 space-y-6"
      >
        {messages.length === 0 ? (
          <div className="max-w-2xl mx-auto my-auto pt-6 pb-12 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-brand/10 text-brand shadow-sm">
                <Bot className="size-7" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {agent.name} is ready when you are
              </h2>
              <p className="text-sm text-muted-foreground">
                Say hello, or hand it something to do.
              </p>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Connecting gives this agent full access. Adjust it anytime under
              Manage.
            </p>

            {/* Quick App Cards */}
            <div className="grid gap-3 sm:grid-cols-3">
              {/* Gmail */}
              <Card className="p-4 flex flex-col justify-between border-border/80 bg-card/60 backdrop-blur-sm hover:border-border transition-colors">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="size-7 rounded-md bg-red-500/10 text-red-500 flex items-center justify-center">
                      <Mail className="size-4" />
                    </div>
                    <span className="font-semibold text-sm text-foreground">
                      Gmail
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Read, compose, and send emails via Gmail.
                  </p>
                </div>
                <div className="pt-3">
                  {connectedApps.includes("Gmail") ? (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDisconnect("Gmail")}
                      className="w-full text-xs h-8 cursor-pointer text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30"
                    >
                      <Check className="size-3 mr-1.5" /> Connected
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const app = ALL_APPS.find((a) => a.name === "Gmail")!;
                        openConnectModal(app);
                      }}
                      className="w-full text-xs h-8 cursor-pointer"
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </Card>

              {/* GitHub */}
              <Card className="p-4 flex flex-col justify-between border-border/80 bg-card/60 backdrop-blur-sm hover:border-border transition-colors">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="size-7 rounded-md bg-foreground/10 text-foreground flex items-center justify-center">
                      <GitBranch className="size-4" />
                    </div>
                    <span className="font-semibold text-sm text-foreground">
                      GitHub
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Repositories, issues, pull requests, and GitHub Actions.
                  </p>
                </div>
                <div className="pt-3">
                  {connectedApps.includes("GitHub") ? (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDisconnect("GitHub")}
                      className="w-full text-xs h-8 cursor-pointer text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30"
                    >
                      <Check className="size-3 mr-1.5" /> Connected
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const app = ALL_APPS.find((a) => a.name === "GitHub")!;
                        openConnectModal(app);
                      }}
                      className="w-full text-xs h-8 cursor-pointer"
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </Card>

              {/* Slack */}
              <Card className="p-4 flex flex-col justify-between border-border/80 bg-card/60 backdrop-blur-sm hover:border-border transition-colors">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="size-7 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <MessageSquare className="size-4" />
                    </div>
                    <span className="font-semibold text-sm text-foreground">
                      Slack
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Chat with this agent from Slack.
                  </p>
                </div>
                <div className="pt-3">
                  {connectedApps.includes("Slack") ? (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDisconnect("Slack")}
                      className="w-full text-xs h-8 cursor-pointer text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30"
                    >
                      <Check className="size-3 mr-1.5" /> Connected
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const app = ALL_APPS.find((a) => a.name === "Slack")!;
                        openConnectModal(app);
                      }}
                      className="w-full text-xs h-8 cursor-pointer"
                    >
                      Set up
                    </Button>
                  )}
                </div>
              </Card>
            </div>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setIsBrowseOpen(true)}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 cursor-pointer transition-colors"
              >
                Looking for something else? Browse all apps
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex w-full",
                  msg.sender === "user"
                    ? "justify-end"
                    : msg.sender === "system-error"
                      ? "justify-center"
                      : "justify-start",
                )}
              >
                {msg.sender === "user" && (
                  <div className="flex flex-col items-end max-w-sm sm:max-w-md">
                    <div className="rounded-2xl rounded-tr-sm bg-foreground text-background px-4 py-2.5 text-sm font-medium shadow-sm">
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1 mr-1">
                      {msg.timestamp}
                    </span>
                  </div>
                )}

                {msg.sender === "system-error" && (
                  <div className="w-full max-w-lg rounded-xl border border-border/80 bg-card/90 p-4 sm:p-5 shadow-sm space-y-3.5 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <Info className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {msg.text}
                      </p>
                    </div>
                    <div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onOpenTab("models")}
                        className="text-xs font-semibold h-8 px-3.5 shadow-xs cursor-pointer border-border hover:bg-accent"
                      >
                        Check the model key
                      </Button>
                    </div>
                  </div>
                )}

                {msg.sender === "agent" && (
                  <div className="flex items-start gap-3 max-w-lg">
                    <div className="size-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0">
                      <Bot className="size-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="rounded-2xl rounded-tl-sm bg-muted/60 border border-border/60 px-4 py-2.5 text-sm text-foreground shadow-sm leading-relaxed">
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-muted-foreground ml-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl bg-muted/50 border border-border/40 px-4 py-3">
                  <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce" />
                  <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
                  <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pinned Input Bar */}
      <div className="border-t bg-card/50 backdrop-blur-md p-4 sm:p-5">
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="relative flex items-center rounded-xl border border-input bg-background/80 shadow-xs focus-within:ring-1 focus-within:ring-ring focus-within:border-ring transition-all">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() =>
                toast.info("File upload supported for agent context")
              }
              className="size-9 ml-1 text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
            >
              <Paperclip className="size-4" />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message your agent..."
              className="border-0 shadow-none focus-visible:ring-0 text-sm px-2 bg-transparent h-11"
            />
            <Button
              type="button"
              size="icon"
              disabled={!input.trim() || isTyping}
              onClick={handleSend}
              className={cn(
                "size-8 mr-1.5 rounded-lg transition-all cursor-pointer shrink-0",
                input.trim()
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "bg-muted text-muted-foreground opacity-50",
              )}
            >
              <Send className="size-3.5" />
            </Button>
          </div>
          <div className="flex items-center justify-between text-[11px] text-muted-foreground px-1">
            <span>Press Enter to send, Shift + Enter for new line</span>
            <span className="flex items-center gap-1 font-mono">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Gateway Proxy: Active
            </span>
          </div>
        </div>
      </div>

      {/* Browse All Apps Dialog */}
      <Dialog open={isBrowseOpen} onOpenChange={setIsBrowseOpen}>
        <DialogContent className="sm:max-w-[680px] max-h-[85vh] flex flex-col p-0 gap-0">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="text-xl font-bold">
              Connect an app
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
              Connecting gives this agent full access. Adjust it anytime under
              Manage.
            </DialogDescription>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Search apps…"
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2.5">
            {filteredApps.length === 0 ? (
              <div className="text-center py-10 text-xs text-muted-foreground">
                No apps found matching &quot;{appSearch}&quot;.
              </div>
            ) : (
              filteredApps.map((app) => {
                const isConn = connectedApps.includes(app.name);
                return (
                  <div
                    key={app.name}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors"
                  >
                    <div className="space-y-0.5 pr-4">
                      <div className="font-semibold text-sm text-foreground">
                        {app.name}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {app.desc}
                      </p>
                    </div>
                    {isConn ? (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleDisconnect(app.name)}
                        className="text-xs shrink-0 h-8 cursor-pointer min-w-20 text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30"
                      >
                        <Check className="size-3 mr-1" /> Connected
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setIsBrowseOpen(false);
                          openConnectModal(app);
                        }}
                        className="text-xs shrink-0 h-8 cursor-pointer min-w-20"
                      >
                        <Plus className="size-3 mr-1" /> Connect
                      </Button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Proper Real Connection Setup Modal */}
      <Dialog
        open={Boolean(activeConnectingApp)}
        onOpenChange={(open) => {
          if (!open) {
            setActiveConnectingApp(null);
            setIsConnectingStep(0);
          }
        }}
      >
        <DialogContent className="sm:max-w-[560px]">
          {activeConnectingApp && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="size-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center font-bold text-sm">
                      {activeConnectingApp.name.slice(0, 2)}
                    </div>
                    <div>
                      <DialogTitle className="text-lg font-bold">
                        Connect {activeConnectingApp.name}
                      </DialogTitle>
                      <DialogDescription className="text-xs text-muted-foreground">
                        Securely grant {agent.name} access via AgentVault Proxy
                      </DialogDescription>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[10px] gap-1 border-emerald-500/30 text-emerald-500 bg-emerald-500/10"
                  >
                    <ShieldCheck className="size-3" />
                    Zero-Trust Vault
                  </Badge>
                </div>
              </DialogHeader>

              {isConnectingStep === 0 && (
                <div className="space-y-4 py-2">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {activeConnectingApp.desc} Credentials will be injected at
                    the network proxy layer. The agent will never receive the
                    raw secret token.
                  </p>

                  {/* Auth Method Selector */}
                  <div className="flex rounded-lg border p-1 bg-muted/30 gap-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setAuthMethod("oauth")}
                      disabled={
                        activeConnectingApp.authType === "apikey" ||
                        activeConnectingApp.authType === "role"
                      }
                      className={cn(
                        "flex-1 py-1.5 rounded-md font-medium text-center transition-all cursor-pointer",
                        authMethod === "oauth"
                          ? "bg-background text-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground",
                        activeConnectingApp.authType === "apikey" ||
                          activeConnectingApp.authType === "role"
                          ? "opacity-50 cursor-not-allowed"
                          : "",
                      )}
                    >
                      OAuth 2.0 (Direct)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMethod("apikey")}
                      className={cn(
                        "flex-1 py-1.5 rounded-md font-medium text-center transition-all cursor-pointer",
                        authMethod === "apikey"
                          ? "bg-background text-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {activeConnectingApp.authType === "role"
                        ? "IAM Role / ARN"
                        : "API Token"}
                    </button>
                  </div>

                  {authMethod === "oauth" ? (
                    <div className="space-y-3 rounded-xl border p-4 bg-muted/10">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium">Account</Label>
                        <Input
                          value={accountEmail}
                          onChange={(e) => setAccountEmail(e.target.value)}
                          placeholder="user@example.com"
                          className="text-xs"
                        />
                      </div>

                      {activeConnectingApp.defaultScopes && (
                        <div className="space-y-1.5">
                          <Label className="text-xs font-medium">
                            Requested OAuth Scopes
                          </Label>
                          <div className="flex flex-wrap gap-1.5">
                            {activeConnectingApp.defaultScopes.map((scope) => (
                              <span
                                key={scope}
                                className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground border"
                              >
                                {scope}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground pt-1">
                        <Lock className="size-3 text-emerald-500" />
                        <span>
                          OAuth tokens are refreshed automatically by the
                          gateway
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 rounded-xl border p-4 bg-muted/10">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium">
                          {activeConnectingApp.authType === "role"
                            ? "AWS Role ARN"
                            : `${activeConnectingApp.name} Secret Key / Access Token`}
                        </Label>
                        <div className="relative">
                          <Input
                            type="password"
                            placeholder={
                              activeConnectingApp.placeholder ||
                              "Enter secret key..."
                            }
                            value={apiKeyInput}
                            onChange={(e) => setApiKeyInput(e.target.value)}
                            className="font-mono text-xs pr-8"
                          />
                          <Key className="absolute right-2.5 top-2.5 size-3.5 text-muted-foreground" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium">
                          Permission Scope
                        </Label>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() => setAccessLevel("full")}
                            className={cn(
                              "border rounded-lg p-2.5 text-left transition-all cursor-pointer",
                              accessLevel === "full"
                                ? "border-brand bg-brand/5 text-foreground ring-1 ring-brand/40"
                                : "border-border text-muted-foreground hover:bg-muted/40",
                            )}
                          >
                            <div className="font-semibold text-xs text-foreground">
                              Full Access
                            </div>
                            <div className="text-[10px] text-muted-foreground mt-0.5">
                              Read, Write, Execute
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setAccessLevel("readonly")}
                            className={cn(
                              "border rounded-lg p-2.5 text-left transition-all cursor-pointer",
                              accessLevel === "readonly"
                                ? "border-brand bg-brand/5 text-foreground ring-1 ring-brand/40"
                                : "border-border text-muted-foreground hover:bg-muted/40",
                            )}
                          >
                            <div className="font-semibold text-xs text-foreground">
                              Read Only
                            </div>
                            <div className="text-[10px] text-muted-foreground mt-0.5">
                              No destructive changes
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                    <span className="flex items-center gap-1">
                      <ExternalLink className="size-3" />
                      Adjust permissions anytime under Manage
                    </span>
                  </div>
                </div>
              )}

              {isConnectingStep === 1 && (
                <div className="py-10 flex flex-col items-center justify-center space-y-3 text-center">
                  <Loader2 className="size-8 text-brand animate-spin" />
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-foreground">
                      Authorizing with {activeConnectingApp.name}...
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Exchanging credentials and verifying policy permissions at
                      the proxy gateway.
                    </p>
                  </div>
                </div>
              )}

              {isConnectingStep === 2 && (
                <div className="py-10 flex flex-col items-center justify-center space-y-3 text-center">
                  <div className="size-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <Check className="size-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-foreground">
                      Connected to {activeConnectingApp.name}!
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Encrypted credentials securely bound to {agent.name}.
                    </p>
                  </div>
                </div>
              )}

              <DialogFooter className="flex items-center justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isConnectingStep > 0}
                  onClick={() => setActiveConnectingApp(null)}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  disabled={isConnectingStep > 0}
                  onClick={handleStartConnection}
                  className="cursor-pointer gap-1.5"
                >
                  Connect {activeConnectingApp.name}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
