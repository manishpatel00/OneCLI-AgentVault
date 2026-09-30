"use client";

import { useState } from "react";
import {
  KeyRound,
  RotateCw,
  Copy,
  Check,
  Eye,
  EyeOff,
  Shield,
  Plug,
} from "lucide-react";
import { Card } from "@agentvault/ui/components/card";
import { Button } from "@agentvault/ui/components/button";
import { Badge } from "@agentvault/ui/components/badge";
import { Switch } from "@agentvault/ui/components/switch";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useRegenerateToken } from "@/hooks/use-agents";
import { CredentialAccessReflection } from "@/lib/components/policy-reflect";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@agentvault/ui/components/alert-dialog";
import Image from "next/image";

interface AgentConnectionsProps {
  agent: {
    id: string;
    name: string;
    identifier: string;
    accessToken: string;
    secretMode?: string;
  };
}

export const AgentConnections = ({ agent }: AgentConnectionsProps) => {
  const { copied, copy } = useCopyToClipboard();
  const regenerateMutation = useRegenerateToken();
  const [showToken, setShowToken] = useState(false);
  const [rotateDialogOpen, setRotateDialogOpen] = useState(false);
  const [secretMode, setSecretMode] = useState(agent.secretMode || "all");

  const handleRotate = () => {
    regenerateMutation.mutate(agent.id, {
      onSuccess: () => setRotateDialogOpen(false),
    });
  };

  const apps = [
    {
      name: "GitHub",
      icon: "/icons/github.svg",
      type: "OAuth App",
      status: "Connected",
      granted: "Repo, Issue, PR Access",
    },
    {
      name: "Slack",
      icon: "/icons/slack.svg",
      type: "Bot Token",
      status: "Connected",
      granted: "Chat:write, Channels:read",
    },
    {
      name: "Stripe",
      icon: "/icons/stripe.svg",
      type: "Restricted Key",
      status: "Connected",
      granted: "Customers:read, Charges:write",
    },
    {
      name: "Google Calendar",
      icon: "/icons/google-calendar.svg",
      type: "OAuth App",
      status: "Connected",
      granted: "Calendar.events",
    },
  ];

  const [policyDialogOpen, setPolicyDialogOpen] = useState(false);

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Agent Credentials &amp; Access
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage how {agent.name} connects to the proxy gateway and which
          credentials are injected at runtime.
        </p>
      </div>

      {/* Gateway Access Token */}
      <Card className="p-6 space-y-4 border-border/80 bg-card/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-medium text-sm text-foreground">
              <KeyRound className="size-4 text-brand" />
              <span>Gateway Access Token</span>
              <Badge variant="outline" className="text-[11px] font-mono">
                {agent.identifier}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Bearer token used by this agent to authenticate requests at the
              gateway.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRotateDialogOpen(true)}
            className="text-xs gap-1.5 cursor-pointer"
          >
            <RotateCw className="size-3.5" />
            Rotate Token
          </Button>
        </div>

        <div className="flex items-center gap-2 rounded-xl border bg-muted/60 px-3.5 py-2.5">
          <code className="flex-1 font-mono text-xs sm:text-sm select-all truncate">
            {showToken
              ? agent.accessToken
              : `${agent.accessToken.slice(0, 8)}${"•".repeat(24)}${agent.accessToken.slice(-6)}`}
          </code>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowToken(!showToken)}
            className="size-7 text-muted-foreground hover:text-foreground"
            title={showToken ? "Hide token" : "Show token"}
          >
            {showToken ? (
              <EyeOff className="size-3.5" />
            ) : (
              <Eye className="size-3.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => copy(agent.accessToken)}
            className="size-7 text-muted-foreground hover:text-foreground"
            title="Copy token"
          >
            {copied ? (
              <Check className="size-3.5 text-brand" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </Button>
        </div>
      </Card>

      {/* Secret Injection Mode */}
      <Card className="p-6 space-y-4 border-border/80 bg-card/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-medium text-sm text-foreground">
              <Shield className="size-4 text-emerald-500" />
              <span>Injection Security Mode</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {secretMode === "all"
                ? "All fenced workspace credentials are automatically injected when host patterns match."
                : "Selective: Only credentials explicitly permitted by policy rules are injected."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium text-muted-foreground">
              {secretMode === "all" ? "All Credentials" : "Selective"}
            </span>
            <Switch
              checked={secretMode === "selective"}
              onCheckedChange={(checked) =>
                setSecretMode(checked ? "selective" : "all")
              }
            />
          </div>
        </div>
      </Card>

      {/* Connected Apps & APIs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-base text-foreground">
              Connected Apps &amp; APIs
            </h3>
            <p className="text-xs text-muted-foreground">
              Services {agent.name} can access through AgentVault.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-xs gap-1.5 cursor-pointer"
          >
            <Plug className="size-3.5" />
            Connect New App
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {apps.map((app) => (
            <div
              key={app.name}
              className="flex items-start gap-3 rounded-xl border border-border/80 bg-card/70 p-4 transition-all hover:border-zinc-500/50 hover:shadow-xs"
            >
              <div className="size-9 rounded-lg border bg-muted/60 p-2 flex items-center justify-center shrink-0">
                <Image
                  src={app.icon}
                  alt={app.name}
                  width={20}
                  height={20}
                  className="size-5 object-contain"
                />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-sm text-foreground truncate">
                    {app.name}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-[10px] text-emerald-500 border-emerald-500/30 bg-emerald-500/10"
                  >
                    {app.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {app.granted}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Rules Reflection */}
      <Card className="p-6 space-y-4 border-border/80 bg-card/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-base text-foreground">
              Policy Engine Reflection
            </h3>
            <p className="text-xs text-muted-foreground">
              Inspect live v2 policy evaluation and credential access granted to{" "}
              {agent.name}.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPolicyDialogOpen(true)}
            className="text-xs gap-1.5 cursor-pointer"
          >
            <Shield className="size-3.5 text-brand" />
            Inspect Policy Access
          </Button>
        </div>
      </Card>

      <CredentialAccessReflection
        agent={{ id: agent.id, name: agent.name }}
        open={policyDialogOpen}
        onOpenChange={setPolicyDialogOpen}
      />

      <AlertDialog open={rotateDialogOpen} onOpenChange={setRotateDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rotate token?</AlertDialogTitle>
            <AlertDialogDescription>
              The current access token for <strong>{agent.name}</strong> will be
              invalidated immediately. Any active agent connections using this
              token must be updated with the new token.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRotate}
              disabled={regenerateMutation.isPending}
            >
              {regenerateMutation.isPending ? "Rotating..." : "Rotate"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
