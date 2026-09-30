"use client";

import { Trash2 } from "lucide-react";
import { Card } from "@agentvault/ui/components/card";
import { Button } from "@agentvault/ui/components/button";
import { toast } from "sonner";

interface AgentMemoryProps {
  agentName: string;
}

export const AgentMemory = ({ agentName }: AgentMemoryProps) => {
  const memories = [
    {
      id: "1",
      key: "preferred_code_style",
      value: "TypeScript strict mode, Next.js App Router, Tailwind CSS.",
      updatedAt: "Yesterday",
    },
    {
      id: "2",
      key: "deployment_environment",
      value: "Vercel production preview with auto-promotions on main branch.",
      updatedAt: "2 days ago",
    },
    {
      id: "3",
      key: "slack_incident_channel",
      value: "#incident-ops (alert on any 5xx spikes > 2%)",
      updatedAt: "3 days ago",
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Persistent Memory Store
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Context and learned facts remembered across {agentName}&apos;s
            sessions.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.success("Memory cleared")}
          className="text-xs text-destructive hover:bg-destructive/10 cursor-pointer"
        >
          <Trash2 className="size-3.5 mr-1.5" />
          Clear All Memory
        </Button>
      </div>

      <div className="grid gap-3">
        {memories.map((m) => (
          <Card
            key={m.id}
            className="p-5 border-border/80 bg-card/80 backdrop-blur-sm space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-brand">
                {m.key}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {m.updatedAt}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-foreground leading-relaxed">
              {m.value}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};
