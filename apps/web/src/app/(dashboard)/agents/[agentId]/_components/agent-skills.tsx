"use client";

import { useState } from "react";
import { Terminal, Globe, Database, CreditCard, GitBranch } from "lucide-react";
import { Card } from "@agentvault/ui/components/card";
import { Switch } from "@agentvault/ui/components/switch";
import { Badge } from "@agentvault/ui/components/badge";

interface AgentSkillsProps {
  agentName: string;
}

export const AgentSkills = ({ agentName }: AgentSkillsProps) => {
  const [skills, setSkills] = useState([
    {
      id: "github",
      name: "GitHub Automation",
      description:
        "Create pull requests, read issues, comment on code reviews.",
      icon: GitBranch,
      enabled: true,
    },
    {
      id: "stripe",
      name: "Stripe Operations",
      description:
        "Query customer accounts, check invoice statuses, trigger refunds.",
      icon: CreditCard,
      enabled: true,
    },
    {
      id: "db",
      name: "Database Query Tool",
      description:
        "Execute read-only SQL queries against fenced database connections.",
      icon: Database,
      enabled: false,
    },
    {
      id: "web",
      name: "Web Browser & Search",
      description:
        "Browse external documentation, fetch web APIs, and summarize articles.",
      icon: Globe,
      enabled: true,
    },
    {
      id: "terminal",
      name: "CLI Shell Execution",
      description: "Execute validated shell commands within container sandbox.",
      icon: Terminal,
      enabled: false,
    },
  ]);

  const toggleSkill = (id: string) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
  };

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Agent Skills &amp; Tools
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Enable or disable capabilities that {agentName} can autonomously
          invoke.
        </p>
      </div>

      <div className="grid gap-3">
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <Card
              key={skill.id}
              className="p-5 flex items-center justify-between gap-4 border-border/80 bg-card/80 backdrop-blur-sm"
            >
              <div className="flex items-start gap-3.5">
                <div className="size-9 rounded-xl border bg-muted/60 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="size-4.5 text-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-foreground">
                      {skill.name}
                    </span>
                    {skill.enabled && (
                      <Badge
                        variant="outline"
                        className="text-[10px] text-emerald-500 border-emerald-500/30 bg-emerald-500/10"
                      >
                        Active
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {skill.description}
                  </p>
                </div>
              </div>
              <Switch
                checked={skill.enabled}
                onCheckedChange={() => toggleSkill(skill.id)}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
};
