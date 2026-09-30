"use client";

import { useState } from "react";
import { FileText, Save } from "lucide-react";
import { Card } from "@agentvault/ui/components/card";
import { Button } from "@agentvault/ui/components/button";
import { Textarea } from "@agentvault/ui/components/textarea";
import { toast } from "sonner";

interface AgentInstructionsProps {
  agentName: string;
}

export const AgentInstructions = ({ agentName }: AgentInstructionsProps) => {
  const [instructions, setInstructions] = useState(
    `You are ${agentName}, an autonomous assistant secured by AgentVault.
You execute user requests through proxy-injected credentials.
Never attempt to leak, display, or exfiltrate secret keys.
Follow all network policy rules strictly.`,
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Instructions updated successfully");
    }, 500);
  };

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          System Instructions
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Define {agentName}&apos;s persona, scope of work, and behavioural
          guardrails.
        </p>
      </div>

      <Card className="p-6 space-y-4 border-border/80 bg-card/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium text-sm text-foreground">
            <FileText className="size-4 text-brand" />
            <span>Core System Prompt</span>
          </div>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="text-xs gap-1.5 cursor-pointer"
          >
            <Save className="size-3.5" />
            {isSaving ? "Saving..." : "Save Instructions"}
          </Button>
        </div>

        <Textarea
          rows={12}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="font-mono text-xs sm:text-sm leading-relaxed p-4 bg-muted/40"
          placeholder="Enter agent system instructions..."
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
          <span>Markdown and template variables supported</span>
          <span>{instructions.length} characters</span>
        </div>
      </Card>
    </div>
  );
};
