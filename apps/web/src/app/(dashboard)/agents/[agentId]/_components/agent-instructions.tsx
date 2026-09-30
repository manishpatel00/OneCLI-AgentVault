"use client";

import { useState } from "react";
import { Card } from "@agentvault/ui/components/card";
import { Button } from "@agentvault/ui/components/button";
import { Textarea } from "@agentvault/ui/components/textarea";
import { toast } from "sonner";

interface AgentInstructionsProps {
  agentName: string;
}

const STARTER_PROMPTS = [
  {
    label: "Support triage",
    text: "Triage our support inbox and draft replies in my voice. Escalate anything about billing, refunds, or security to the team immediately.",
  },
  {
    label: "Release notes",
    text: "Review recently merged pull requests and generate clean, customer-facing release notes. Group by New Features, Fixes, and Infrastructure.",
  },
  {
    label: "On-call helper",
    text: "Monitor system health alerts, inspect gateway logs for 4xx/5xx anomalies, and suggest immediate triage actions according to runbooks.",
  },
];

export const AgentInstructions = ({ agentName }: AgentInstructionsProps) => {
  const [instructions, setInstructions] = useState(
    `You are ${agentName}, an autonomous assistant secured by AgentVault.\nYou execute requests with injected credentials through the gateway.\nNever leak secret keys or violate network access policies.`,
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSelectStarter = (text: string) => {
    setInstructions(text);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Instructions saved. Will take effect on next start.");
    }, 400);
  };

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          What should it do?
        </h2>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          The brief your agent starts every session with: who it is, what it
          owns, and how it should work.
        </p>
      </div>

      <Card className="p-6 space-y-5 border-border/80 bg-card/60 backdrop-blur-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Start from:</span>
            <div className="flex flex-wrap gap-1.5">
              {STARTER_PROMPTS.map((starter) => (
                <button
                  key={starter.label}
                  type="button"
                  onClick={() => handleSelectStarter(starter.text)}
                  className="rounded-full border border-border/70 bg-muted/40 hover:bg-muted/80 px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {starter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Textarea
          rows={12}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="font-mono text-xs sm:text-sm leading-relaxed p-4 bg-muted/30 focus-visible:ring-1"
          placeholder="e.g. Triage our support inbox and draft replies in my voice. Escalate anything about billing."
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <p className="text-xs text-muted-foreground">
            Changes reach the agent the next time it starts up.
          </p>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="cursor-pointer min-w-20"
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </Card>
    </div>
  );
};
