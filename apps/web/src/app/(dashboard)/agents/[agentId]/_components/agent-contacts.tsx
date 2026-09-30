"use client";

import { Badge } from "@agentvault/ui/components/badge";
import { Users, Hash, Bot, AppWindow } from "lucide-react";

interface AgentContactsProps {
  agentName: string;
}

export const AgentContacts = ({ agentName }: AgentContactsProps) => {
  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-8 max-w-4xl mx-auto">
      {/* People Section */}
      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-2">
            <Users className="size-4 text-muted-foreground" />
            <h3 className="text-base font-semibold text-foreground">People</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Who can message {agentName} directly.
          </p>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm">
          <span className="text-sm font-medium text-foreground">
            Workspace members
          </span>
          <Badge
            variant="outline"
            className="text-xs text-emerald-500 border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 rounded-full font-medium"
          >
            Allowed
          </Badge>
        </div>
      </div>

      {/* Channels Section */}
      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-2">
            <Hash className="size-4 text-muted-foreground" />
            <h3 className="text-base font-semibold text-foreground">
              Channels
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Where the agent is, and who it answers there.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-dashed border-border/70 bg-card/30 text-xs text-muted-foreground">
          Mention {agentName} in a channel to add it here.
        </div>
      </div>

      {/* Agents Section */}
      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="size-4 text-muted-foreground" />
            <h3 className="text-base font-semibold text-foreground">Agents</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Other agents this one can message. Both sides must allow.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-dashed border-border/70 bg-card/30 text-xs text-muted-foreground">
          No other agents yet.
        </div>
      </div>

      {/* Apps Section */}
      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-2">
            <AppWindow className="size-4 text-muted-foreground" />
            <h3 className="text-base font-semibold text-foreground">Apps</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Apps {agentName} has messaged.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-dashed border-border/70 bg-card/30 text-xs text-muted-foreground">
          None yet.
        </div>
      </div>
    </div>
  );
};
