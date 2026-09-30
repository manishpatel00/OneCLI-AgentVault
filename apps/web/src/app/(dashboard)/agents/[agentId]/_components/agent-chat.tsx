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
} from "lucide-react";
import { Button } from "@agentvault/ui/components/button";
import { Input } from "@agentvault/ui/components/input";
import { Card } from "@agentvault/ui/components/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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

const ALL_APPS = [
  {
    name: "Affinity",
    desc: "Manage relationships, deals, and interactions in Affinity CRM.",
  },
  {
    name: "Attio",
    desc: "Contacts, companies, deals, lists, notes, and tasks.",
  },
  { name: "AWS", desc: "Access AWS services: S3, EC2, Lambda, and more." },
  {
    name: "AWS Role",
    desc: "Connect via IAM AssumeRole with temporary credentials and per-agent permissions. No keys shared.",
  },
  {
    name: "Cloudflare",
    desc: "Deploy Workers, manage DNS, KV, D1, Pages, and other Cloudflare services.",
  },
  {
    name: "Confluence",
    desc: "Pages, spaces, and documentation in Confluence Cloud.",
  },
  {
    name: "Datadog",
    desc: "Monitoring, APM, logs, and infrastructure metrics.",
  },
  {
    name: "Docker Hub",
    desc: "Manage Docker Hub repositories, images, tags, and organizations.",
  },
  { name: "Dropbox", desc: "Cloud file storage, sharing, and collaboration." },
  {
    name: "Fathom",
    desc: "AI meeting notes: recordings, transcripts, and summaries.",
  },
  {
    name: "Fireflies",
    desc: "AI meeting transcripts, summaries, and action items.",
  },
  {
    name: "Fly.io",
    desc: "Deploy and manage applications, Machines, volumes, and secrets on Fly.io.",
  },
  {
    name: "GitHub",
    desc: "Repositories, issues, pull requests, and GitHub Actions.",
  },
  {
    name: "GitHub App",
    desc: "Fine-grained, org-approved access to repositories and resources.",
  },
  {
    name: "GitLab",
    desc: "Repositories, issues, merge requests, and CI/CD pipelines.",
  },
  { name: "Gmail", desc: "Read, compose, and send emails via Gmail." },
  {
    name: "Google Admin",
    desc: "Manage users, groups, and devices in Google Workspace.",
  },
  {
    name: "Google Analytics",
    desc: "Access report data and run analytics queries.",
  },
  {
    name: "Google Calendar",
    desc: "Read, create, and manage calendar events.",
  },
  {
    name: "Google Chat",
    desc: "Send messages and manage spaces in Google Chat.",
  },
  {
    name: "Google Classroom",
    desc: "Manage classes, rosters, and invitations.",
  },
  {
    name: "Google Contacts",
    desc: "Read, search, and manage Google Contacts.",
  },
  {
    name: "Google Docs",
    desc: "Read, create, and edit Google Docs documents.",
  },
  { name: "Google Drive", desc: "Read, create, and manage files and folders." },
  { name: "Google Forms", desc: "Read, create, and edit forms and responses." },
  { name: "Google Meet", desc: "Create and manage meetings." },
  { name: "Google Photos", desc: "Manage photos, videos, and albums." },
  {
    name: "Google Search Console",
    desc: "View search traffic data and manage site presence.",
  },
  { name: "Google Sheets", desc: "Read, create, and edit spreadsheets." },
  { name: "Google Slides", desc: "Read, create, and edit presentations." },
  { name: "Google Tasks", desc: "Manage task lists and tasks." },
  {
    name: "Granola",
    desc: "AI meeting notes. Search and retrieve your notes and folders.",
  },
  { name: "HubSpot", desc: "CRM contacts, companies, deals, and tickets." },
  {
    name: "JFrog Artifactory",
    desc: "Pull npm, PyPI, and other packages through your JFrog Artifactory instance.",
  },
  { name: "Jira", desc: "Projects, issues, and workflows in Jira Cloud." },
  {
    name: "Linear",
    desc: "Issues, projects, teams, and product development workflows.",
  },
  { name: "LinkedIn", desc: "Profile, posts, and social engagement." },
  {
    name: "Microsoft OneNote",
    desc: "Read and manage notebooks, sections, and pages in Microsoft OneNote.",
  },
  {
    name: "Microsoft Word",
    desc: "Read and edit Word documents stored in OneDrive and SharePoint.",
  },
  {
    name: "monday.com",
    desc: "Boards, items, docs, and workspace management.",
  },
  {
    name: "MongoDB Atlas",
    desc: "Manage clusters, users, and projects via the Atlas Administration API.",
  },
  {
    name: "Notion",
    desc: "Pages, databases, comments, and workspace content.",
  },
  {
    name: "Outlook Calendar",
    desc: "View and manage calendar events in Microsoft Outlook.",
  },
  {
    name: "Outlook Mail",
    desc: "Read, compose, and send emails via Microsoft Outlook.",
  },
  { name: "Resend", desc: "Send transactional and marketing emails." },
  {
    name: "Salesforce",
    desc: "Salesforce CRM records, queries, and object metadata.",
  },
  {
    name: "Sentry",
    desc: "Error tracking, performance monitoring, and issue management.",
  },
  {
    name: "Snowflake",
    desc: "Run SQL and manage your Snowflake data cloud account.",
  },
  {
    name: "Stripe",
    desc: "Payments, customers, subscriptions, invoices, and refunds on your Stripe account.",
  },
  {
    name: "Supabase",
    desc: "Projects, databases, edge functions, and storage.",
  },
  { name: "Todoist", desc: "Tasks, projects, and productivity tracking." },
  { name: "Trello", desc: "Boards, lists, and cards for project management." },
  {
    name: "Vercel",
    desc: "Projects, deployments, domains, and environment variables.",
  },
  { name: "Vertex AI", desc: "Access Vertex AI models on Google Cloud." },
  { name: "X", desc: "Posts, timelines, DMs, and account management." },
  {
    name: "YouTube",
    desc: "Manage playlists, videos, and channel content on YouTube.",
  },
  {
    name: "Zoho CRM",
    desc: "Leads, contacts, accounts, deals, and tasks in Zoho CRM.",
  },
  { name: "Zoom", desc: "Meetings, webinars, and cloud recordings." },
];

export const AgentChat = ({ agent, onOpenTab }: AgentChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const [appSearch, setAppSearch] = useState("");
  const [connectedApps, setConnectedApps] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const toggleConnectApp = (appName: string) => {
    if (connectedApps.includes(appName)) {
      setConnectedApps((prev) => prev.filter((a) => a !== appName));
      toast.info(`Disconnected from ${appName}`);
    } else {
      setConnectedApps((prev) => [...prev, appName]);
      toast.success(`Connected to ${appName}`);
    }
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
        const replyMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          text: `Hello! I received "${userText}". I am connected through the AgentVault proxy gateway with credentials safely injected. How can I assist you further?`,
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
                  <Button
                    size="sm"
                    variant={
                      connectedApps.includes("Gmail") ? "secondary" : "outline"
                    }
                    onClick={() => toggleConnectApp("Gmail")}
                    className="w-full text-xs h-8 cursor-pointer"
                  >
                    {connectedApps.includes("Gmail") ? (
                      <>
                        <Check className="size-3 mr-1.5" /> Connected
                      </>
                    ) : (
                      "Connect"
                    )}
                  </Button>
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
                  <Button
                    size="sm"
                    variant={
                      connectedApps.includes("GitHub") ? "secondary" : "outline"
                    }
                    onClick={() => toggleConnectApp("GitHub")}
                    className="w-full text-xs h-8 cursor-pointer"
                  >
                    {connectedApps.includes("GitHub") ? (
                      <>
                        <Check className="size-3 mr-1.5" /> Connected
                      </>
                    ) : (
                      "Connect"
                    )}
                  </Button>
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
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onOpenTab("slack")}
                    className="w-full text-xs h-8 cursor-pointer"
                  >
                    Set up
                  </Button>
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

      {/* Connect an app Dialog */}
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
                    <Button
                      size="sm"
                      variant={isConn ? "secondary" : "outline"}
                      onClick={() => toggleConnectApp(app.name)}
                      className="text-xs shrink-0 h-8 cursor-pointer min-w-20"
                    >
                      {isConn ? (
                        <>
                          <Check className="size-3 mr-1" /> Connected
                        </>
                      ) : (
                        <>
                          <Plus className="size-3 mr-1" /> Connect
                        </>
                      )}
                    </Button>
                  </div>
                );
              })
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
