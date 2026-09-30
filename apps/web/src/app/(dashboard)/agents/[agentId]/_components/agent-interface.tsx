"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Bot,
  MessageSquare,
  Plug,
  Cpu,
  FileText,
  Sparkles,
  Calendar,
  Brain,
  Terminal,
  Users,
  MoreHorizontal,
  Trash2,
  KeyRound,
  Pencil,
  Star,
  Hash,
} from "lucide-react";
import { Button } from "@agentvault/ui/components/button";
import { Badge } from "@agentvault/ui/components/badge";
import { Skeleton } from "@agentvault/ui/components/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@agentvault/ui/components/dropdown-menu";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@agentvault/ui/components/dialog";
import { Input } from "@agentvault/ui/components/input";
import { Label } from "@agentvault/ui/components/label";
import {
  useAgent,
  useDeleteAgent,
  useRenameAgent,
  useSetDefaultAgent,
} from "@/hooks/use-agents";
import { cn } from "@agentvault/ui/lib/utils";

import { AgentChat } from "./agent-chat";
import { AgentConnections } from "./agent-connections";
import { AgentModels } from "./agent-models";
import { AgentInstructions } from "./agent-instructions";
import { AgentSlack } from "./agent-slack";
import { AgentSkills } from "./agent-skills";
import { AgentSchedules } from "./agent-schedules";
import { AgentMemory } from "./agent-memory";
import { AgentSSH } from "./agent-ssh";
import { AgentContacts } from "./agent-contacts";

interface AgentInterfaceProps {
  agentId: string;
}

export const AgentInterface = ({ agentId }: AgentInterfaceProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "chat";
  const [activeTab, setActiveTab] = useState(initialTab);

  const { data: agent, isPending: loading, error } = useAgent(agentId);
  const deleteMutation = useDeleteAgent();
  const renameMutation = useRenameAgent();
  const setDefaultMutation = useSetDefaultAgent();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams, activeTab]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tabId);
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  const handleDelete = () => {
    if (!agent) return;
    deleteMutation.mutate(agent.id, {
      onSuccess: () => router.push("/agents"),
    });
  };

  const handleRename = () => {
    if (!agent || !newName.trim()) return;
    renameMutation.mutate(
      { agentId: agent.id, name: newName },
      { onSuccess: () => setRenameDialogOpen(false) },
    );
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <div className="space-y-4 w-full max-w-md">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center space-y-4">
        <div className="size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          <Bot className="size-6" />
        </div>
        <h2 className="text-lg font-bold">Agent Not Found</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          This agent may have been removed or you may not have permission to
          view it.
        </p>
        <Button asChild variant="outline" size="sm">
          <Link href="/agents">
            <ArrowLeft className="size-3.5 mr-1.5" />
            Back to Agents
          </Link>
        </Button>
      </div>
    );
  }

  const navSections = [
    {
      label: "Work",
      items: [
        { id: "chat", title: "Chat", icon: MessageSquare },
        { id: "slack", title: "Slack", icon: Hash },
      ],
    },
    {
      label: "Access",
      items: [
        { id: "connections", title: "Connections", icon: Plug, badge: "1" },
        { id: "contacts", title: "Contacts", icon: Users },
        { id: "models", title: "Models", icon: Cpu, badge: "3" },
        { id: "ssh", title: "SSH", icon: Terminal },
      ],
    },
    {
      label: "Behavior",
      items: [
        { id: "instructions", title: "Instructions", icon: FileText },
        { id: "skills", title: "Skills", icon: Sparkles },
        { id: "schedules", title: "Schedules", icon: Calendar },
        { id: "memory", title: "Memory", icon: Brain },
      ],
    },
  ];

  return (
    <div className="flex h-full w-full overflow-hidden bg-background">
      {/* Inner Agent Navigation Sidebar */}
      <aside className="w-56 sm:w-60 shrink-0 border-r border-border/70 flex flex-col justify-between overflow-y-auto bg-muted/20 p-3">
        <div className="space-y-6">
          {navSections.map((section) => (
            <div key={section.label} className="space-y-1">
              <span className="px-2 text-[11px] font-semibold tracking-wider text-muted-foreground/70 uppercase select-none">
                {section.label}
              </span>
              <div className="space-y-0.5 pt-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleTabChange(item.id)}
                      className={cn(
                        "w-full flex items-center justify-between gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer select-none",
                        isActive
                          ? "bg-brand/10 text-brand font-semibold shadow-2xs"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={cn(
                            "size-4 shrink-0",
                            isActive
                              ? "text-brand"
                              : "text-muted-foreground/80",
                          )}
                        />
                        <span className="truncate">{item.title}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={cn(
                            "rounded-full px-1.5 py-0.2 text-[10px] font-mono",
                            isActive
                              ? "bg-brand/20 text-brand"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Back to All Agents Button */}
        <div className="pt-4 border-t border-border/50">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="w-full justify-start text-xs text-muted-foreground hover:text-foreground"
          >
            <Link href="/agents">
              <ArrowLeft className="size-3.5 mr-2" />
              Manage all agents
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Agent Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header Bar for Agent */}
        <header className="h-13 shrink-0 border-b border-border/70 flex items-center justify-between px-4 sm:px-6 bg-card/40 backdrop-blur-md">
          <div className="flex items-center gap-3 min-w-0">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-foreground shrink-0"
              title="Back to agents"
            >
              <Link href="/agents">
                <ArrowLeft className="size-4" />
              </Link>
            </Button>

            <div className="size-8.5 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0">
              <Bot className="size-4.5" />
            </div>

            <div className="flex items-center gap-2 truncate">
              <h1 className="font-bold text-base sm:text-lg text-foreground truncate">
                {agent.name}
              </h1>
              <Badge
                variant="outline"
                className="text-[11px] border-emerald-500/30 text-emerald-500 bg-emerald-500/10 gap-1.5 shrink-0"
              >
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </Badge>
              <code className="hidden sm:inline-block font-mono text-[11px] text-muted-foreground/80 bg-muted/60 px-1.5 py-0.5 rounded">
                {agent.identifier}
              </code>
              {agent.isDefault && (
                <Badge variant="secondary" className="text-[10px] shrink-0">
                  Default
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onSelect={() => {
                    setNewName(agent.name);
                    setRenameDialogOpen(true);
                  }}
                >
                  <Pencil className="size-4 mr-2" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => handleTabChange("connections")}
                >
                  <KeyRound className="size-4 mr-2" />
                  Credential access
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {!agent.isDefault && (
                  <DropdownMenuItem
                    onSelect={() => setDefaultMutation.mutate(agent.id)}
                  >
                    <Star className="size-4 mr-2" />
                    Set as default
                  </DropdownMenuItem>
                )}
                {!agent.isDefault && (
                  <DropdownMenuItem
                    variant="destructive"
                    onSelect={() => setDeleteDialogOpen(true)}
                  >
                    <Trash2 className="size-4 mr-2" />
                    Delete agent
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Tab Body */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {activeTab === "chat" && (
            <AgentChat agent={agent} onOpenTab={handleTabChange} />
          )}
          {activeTab === "connections" && <AgentConnections agent={agent} />}
          {activeTab === "models" && <AgentModels agentName={agent.name} />}
          {activeTab === "instructions" && (
            <AgentInstructions agentName={agent.name} />
          )}
          {activeTab === "slack" && <AgentSlack agentName={agent.name} />}
          {activeTab === "skills" && <AgentSkills agentName={agent.name} />}
          {activeTab === "schedules" && (
            <AgentSchedules agentName={agent.name} />
          )}
          {activeTab === "memory" && <AgentMemory agentName={agent.name} />}
          {activeTab === "ssh" && <AgentSSH agentName={agent.name} />}
          {activeTab === "contacts" && <AgentContacts agentName={agent.name} />}
        </div>
      </div>

      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename agent</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-3">
            <Label htmlFor="agent-new-name">New Agent Name</Label>
            <Input
              id="agent-new-name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Donna"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleRename}
              disabled={!newName.trim() || renameMutation.isPending}
            >
              {renameMutation.isPending ? "Renaming..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete agent?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{agent.name}</strong>? Any
              active gateway sessions using this agent&apos;s token will lose
              access immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
