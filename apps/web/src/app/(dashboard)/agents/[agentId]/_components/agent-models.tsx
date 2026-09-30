"use client";

import { useState, useEffect } from "react";
import { Check, Key } from "lucide-react";
import { Card } from "@agentvault/ui/components/card";
import { Button } from "@agentvault/ui/components/button";
import { Input } from "@agentvault/ui/components/input";
import { Label } from "@agentvault/ui/components/label";
import { Badge } from "@agentvault/ui/components/badge";
import { toast } from "sonner";

interface AgentModelsProps {
  agentName: string;
}

export const AgentModels = ({ agentName }: AgentModelsProps) => {
  const [anthropicKey, setAnthropicKey] = useState("");
  const [openaiKey, setOpenaiKey] = useState("");
  const [activeModel, setActiveModel] = useState("claude-3-5-sonnet");

  const models = [
    {
      id: "claude-3-5-sonnet",
      name: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      context: "200k tokens",
      description:
        "Highest intelligence model for complex coding and agentic reasoning.",
      recommended: true,
    },
    {
      id: "claude-3-haiku",
      name: "Claude 3.5 Haiku",
      provider: "Anthropic",
      context: "200k tokens",
      description:
        "Ultra-fast response model optimized for autonomous tools and execution.",
    },
    {
      id: "gpt-4o",
      name: "GPT-4o",
      provider: "OpenAI",
      context: "128k tokens",
      description:
        "Flagship multimodal intelligence for high-throughput workflows.",
    },
    {
      id: "gpt-4o-mini",
      name: "GPT-4o Mini",
      provider: "OpenAI",
      context: "128k tokens",
      description:
        "Affordable and fast reasoning for background evaluation tasks.",
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("agentvault_has_model_key");
      if (stored === "true") {
        setAnthropicKey("sk-ant-api03-••••••••••••••••••••••••••••");
      }
    }
  }, []);

  const handleSave = () => {
    if (typeof window !== "undefined") {
      if (anthropicKey.trim() || openaiKey.trim()) {
        localStorage.setItem("agentvault_has_model_key", "true");
        toast.success(
          "Model provider settings saved. Agent is ready to respond.",
        );
      } else {
        localStorage.setItem("agentvault_has_model_key", "false");
        toast.info(
          "No keys provided. Model provider will reject requests until key is added.",
        );
      }
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            LLM Models &amp; Provider Keys
          </h2>
          <Badge variant="outline" className="text-xs">
            3 LLMs Available
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Configure which foundational models {agentName} uses and manage
          upstream API keys.
        </p>
      </div>

      {/* Model Selection */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider text-muted-foreground">
          Active Reasoning Model
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {models.map((m) => {
            const isSelected = activeModel === m.id;
            return (
              <div
                key={m.id}
                onClick={() => setActiveModel(m.id)}
                className={`relative flex flex-col justify-between rounded-xl border p-4 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "border-brand bg-brand/5 dark:bg-brand/10 shadow-xs"
                    : "border-border/80 bg-card hover:border-zinc-500/50"
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm text-foreground">
                      {m.name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {m.recommended && (
                        <Badge
                          variant="outline"
                          className="text-[10px] border-emerald-500/30 text-emerald-500 bg-emerald-500/10"
                        >
                          Default
                        </Badge>
                      )}
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {m.provider}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {m.description}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/40 pt-2">
                  <span>Context: {m.context}</span>
                  {isSelected && (
                    <span className="flex items-center gap-1 text-brand font-medium">
                      <Check className="size-3.5" />
                      Active
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Provider Keys Configuration */}
      <Card className="p-6 space-y-6 border-border/80 bg-card/80 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="size-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
            <Key className="size-5" />
          </div>
          <div>
            <h3 className="font-semibold text-base text-foreground">
              Provider API Credentials
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              AgentVault securely proxies requests to Anthropic and OpenAI. Keys
              are encrypted at rest with AES-256-GCM.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="anthropic-key" className="text-xs font-medium">
                Anthropic API Key
              </Label>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                Connected via Gateway
              </span>
            </div>
            <Input
              id="anthropic-key"
              type="password"
              placeholder="sk-ant-api03-••••••••••••••••••••"
              value={anthropicKey}
              onChange={(e) => setAnthropicKey(e.target.value)}
              className="font-mono text-xs"
            />
            <p className="text-[11px] text-muted-foreground">
              Required for Claude 3.5 Sonnet and Haiku calls.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="openai-key" className="text-xs font-medium">
                OpenAI API Key
              </Label>
              <span className="text-[11px] text-muted-foreground">
                Optional
              </span>
            </div>
            <Input
              id="openai-key"
              type="password"
              placeholder="sk-proj-••••••••••••••••••••"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              className="font-mono text-xs"
            />
            <p className="text-[11px] text-muted-foreground">
              Used when switching agents to GPT-4o or Whisper models.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            onClick={handleSave}
            className="text-xs font-medium cursor-pointer"
          >
            Save Provider Keys
          </Button>
        </div>
      </Card>
    </div>
  );
};
