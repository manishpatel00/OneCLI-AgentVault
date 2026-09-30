"use client";

import { Mail, Plus } from "lucide-react";
import { Card } from "@agentvault/ui/components/card";
import { Button } from "@agentvault/ui/components/button";
import { Badge } from "@agentvault/ui/components/badge";

interface AgentContactsProps {
  agentName: string;
}

export const AgentContacts = ({ agentName }: AgentContactsProps) => {
  const contacts = [
    {
      id: "1",
      name: "Manish Kumar",
      email: "manishpatel953249@gmail.com",
      role: "Workspace Owner & Approver",
      type: "Primary Escalation",
    },
    {
      id: "2",
      name: "DevOps On-Call",
      email: "oncall@acme.io",
      role: "Infrastructure Team",
      type: "Emergency Alert",
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Contacts &amp; Escalation
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            People and teams {agentName} can notify or request approval from.
          </p>
        </div>
        <Button size="sm" className="text-xs gap-1.5 cursor-pointer">
          <Plus className="size-3.5" />
          Add Contact
        </Button>
      </div>

      <div className="grid gap-3">
        {contacts.map((c) => (
          <Card
            key={c.id}
            className="p-5 flex items-center justify-between gap-4 border-border/80 bg-card/80 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center font-bold text-sm text-brand">
                {c.name.charAt(0)}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-foreground">
                    {c.name}
                  </span>
                  <Badge variant="outline" className="text-[10px]">
                    {c.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="size-3" />
                    {c.email}
                  </span>
                  <span>•</span>
                  <span>{c.role}</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              Configure Approvals
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
