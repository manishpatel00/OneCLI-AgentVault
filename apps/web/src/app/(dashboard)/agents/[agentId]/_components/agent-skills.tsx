"use client";

import { useState } from "react";
import { Sparkles, Plus, Trash2, FileCode } from "lucide-react";
import { Card } from "@agentvault/ui/components/card";
import { Button } from "@agentvault/ui/components/button";
import { Input } from "@agentvault/ui/components/input";
import { Label } from "@agentvault/ui/components/label";
import { Textarea } from "@agentvault/ui/components/textarea";
import { Switch } from "@agentvault/ui/components/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@agentvault/ui/components/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@agentvault/ui/components/dialog";
import { toast } from "sonner";

interface AgentSkillsProps {
  agentName: string;
}

interface SkillItem {
  id: string;
  name: string;
  scope: string;
  description: string;
  instructions: string;
  enabled: boolean;
}

export const AgentSkills = ({ agentName }: AgentSkillsProps) => {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [scope, setScope] = useState("Only this agent");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleCreate = () => {
    if (!name.trim()) {
      toast.error("Please enter a name for the skill.");
      return;
    }

    const newSkill: SkillItem = {
      id: Date.now().toString(),
      name: name.trim().toLowerCase().replace(/\s+/g, "-"),
      scope,
      description: description.trim(),
      instructions: instructions.trim(),
      enabled: true,
    };

    setSkills((prev) => [newSkill, ...prev]);
    setIsDialogOpen(false);
    setName("");
    setScope("Only this agent");
    setDescription("");
    setInstructions("");
    toast.success("Skill created successfully");
  };

  const handleToggle = (id: string) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
  };

  const handleDelete = (id: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
    toast.success("Skill removed");
  };

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Skills
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
            Write down how you want {agentName} to do something, once. This
            agent picks it up within seconds, or at its next start if it is
            asleep.
          </p>
        </div>
        {skills.length > 0 && (
          <Button
            size="sm"
            onClick={() => setIsDialogOpen(true)}
            className="cursor-pointer gap-1.5"
          >
            <Plus className="size-4" />
            New skill
          </Button>
        )}
      </div>

      {skills.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-border/70 bg-card/40 rounded-2xl min-h-[300px]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/60 text-muted-foreground mb-4">
            <Sparkles className="size-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">
            No skills yet
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 max-w-md">
            Write down how you want something done, once. This agent picks it up
            within seconds, or at its next start if it is asleep.
          </p>
          <Button
            size="sm"
            onClick={() => setIsDialogOpen(true)}
            className="mt-5 cursor-pointer gap-1.5"
          >
            <Plus className="size-4" />
            New skill
          </Button>
        </Card>
      ) : (
        <div className="grid gap-3">
          {skills.map((skill) => (
            <Card
              key={skill.id}
              className="p-5 border-border/80 bg-card/60 backdrop-blur-sm space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center">
                    <FileCode className="size-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground px-2 py-0.5 rounded-full border border-border/70 bg-muted/40">
                        {skill.scope}
                      </span>
                    </div>
                    {skill.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {skill.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={skill.enabled}
                    onCheckedChange={() => handleToggle(skill.id)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(skill.id)}
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive size-7 cursor-pointer transition-opacity"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
              {skill.instructions && (
                <div className="text-xs font-mono text-muted-foreground bg-muted/30 p-2.5 rounded-md leading-relaxed line-clamp-3">
                  {skill.instructions}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* New skill Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              New skill
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
              Reusable instructions your agents load while they work.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="skill-name" className="text-xs font-medium">
                  Name
                </Label>
                <Input
                  id="skill-name"
                  placeholder="release-checklist"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="skill-scope" className="text-xs font-medium">
                  Who gets it
                </Label>
                <Select value={scope} onValueChange={setScope}>
                  <SelectTrigger id="skill-scope" className="text-xs">
                    <SelectValue placeholder="Select scope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Only this agent">
                      Only this agent
                    </SelectItem>
                    <SelectItem value="All agents in workspace">
                      All agents in workspace
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="skill-desc" className="text-xs font-medium">
                Description
              </Label>
              <Input
                id="skill-desc"
                placeholder="One line: how the agent decides when to use it"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="skill-body" className="text-xs font-medium">
                  Instructions (SKILL.md body)
                </Label>
                <span className="text-[11px] text-muted-foreground">
                  {instructions.length} / 32,000
                </span>
              </div>
              <Textarea
                id="skill-body"
                rows={6}
                maxLength={32000}
                placeholder="Markdown the agent follows when it loads this skill."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="text-xs leading-relaxed font-mono"
              />
            </div>

            <div className="pt-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => toast.info("Attach file feature ready")}
                className="text-xs gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground"
              >
                <Plus className="size-3.5" />
                Add file
              </Button>
            </div>
          </div>

          <DialogFooter className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDialogOpen(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleCreate}
              className="cursor-pointer min-w-16"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
