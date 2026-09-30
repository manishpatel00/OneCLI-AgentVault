"use client";

import { ExternalLink, Hash } from "lucide-react";
import { Card } from "@agentvault/ui/components/card";
import { Button } from "@agentvault/ui/components/button";
import { Badge } from "@agentvault/ui/components/badge";
import { Switch } from "@agentvault/ui/components/switch";
import Image from "next/image";

interface AgentSlackProps {
  agentName: string;
}

export const AgentSlack = ({ agentName }: AgentSlackProps) => {
  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Slack Integration
          </h2>
          <Badge
            variant="outline"
            className="text-xs text-emerald-500 border-emerald-500/30 bg-emerald-500/10"
          >
            Enabled
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Connect {agentName} directly to your team&apos;s Slack channels for
          real-time interaction.
        </p>
      </div>

      <Card className="p-6 space-y-6 border-border/80 bg-card/80 backdrop-blur-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl border bg-muted/60 p-2 flex items-center justify-center shrink-0">
              <Image
                src="/icons/slack.svg"
                alt="Slack"
                width={24}
                height={24}
                className="size-6 object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">
                Acme Corp Slack Workspace
              </h3>
              <p className="text-xs text-muted-foreground">
                Bot User: @{agentName.toLowerCase()} · Connected via AgentVault
                App
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-xs gap-1.5 cursor-pointer"
          >
            <ExternalLink className="size-3.5" />
            Manage in Slack
          </Button>
        </div>

        <div className="space-y-4 border-t border-border/60 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Auto-respond in channels
              </p>
              <p className="text-xs text-muted-foreground">
                Respond when {agentName} is mentioned in configured channels.
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Direct Message Support
              </p>
              <p className="text-xs text-muted-foreground">
                Allow team members to DM this agent for autonomous tasks.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        <div className="space-y-2 border-t border-border/60 pt-4">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Active Channel Bindings
          </span>
          <div className="flex flex-wrap gap-2 pt-1">
            <Badge
              variant="secondary"
              className="gap-1.5 font-mono text-xs py-1"
            >
              <Hash className="size-3" />
              dev-agents
            </Badge>
            <Badge
              variant="secondary"
              className="gap-1.5 font-mono text-xs py-1"
            >
              <Hash className="size-3" />
              support-triage
            </Badge>
            <Badge
              variant="secondary"
              className="gap-1.5 font-mono text-xs py-1"
            >
              <Hash className="size-3" />
              incident-ops
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};
