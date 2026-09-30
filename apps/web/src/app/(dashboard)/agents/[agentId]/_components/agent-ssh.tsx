"use client";

import { Key, Plus, Copy, Check } from "lucide-react";
import { Card } from "@agentvault/ui/components/card";
import { Button } from "@agentvault/ui/components/button";
import { Badge } from "@agentvault/ui/components/badge";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface AgentSSHProps {
  agentName: string;
}

export const AgentSSH = ({ agentName }: AgentSSHProps) => {
  const { copied, copy } = useCopyToClipboard();
  const publicKey =
    "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIK+8v2kLm7Z7oQv4A8W5R1E9x2AgentVault=";

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            SSH Access &amp; Keys
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Allow {agentName} to authenticate to remote staging and deployment
            servers.
          </p>
        </div>
        <Button size="sm" className="text-xs gap-1.5 cursor-pointer">
          <Plus className="size-3.5" />
          Add Remote Server
        </Button>
      </div>

      <Card className="p-6 border-border/80 bg-card/80 backdrop-blur-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium text-sm text-foreground">
            <Key className="size-4 text-brand" />
            <span>Agent Public Key</span>
            <Badge variant="outline" className="text-[10px]">
              ED25519
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copy(publicKey)}
            className="text-xs gap-1.5 cursor-pointer"
          >
            {copied ? (
              <Check className="size-3.5 text-brand" />
            ) : (
              <Copy className="size-3.5" />
            )}
            Copy Key
          </Button>
        </div>
        <div className="rounded-xl border bg-muted/60 p-3 font-mono text-xs select-all break-all">
          {publicKey}
        </div>
        <p className="text-xs text-muted-foreground">
          Add this public key to{" "}
          <code className="bg-muted px-1 py-0.5 rounded font-mono">
            ~/.ssh/authorized_keys
          </code>{" "}
          on servers this agent is authorized to manage.
        </p>
      </Card>
    </div>
  );
};
