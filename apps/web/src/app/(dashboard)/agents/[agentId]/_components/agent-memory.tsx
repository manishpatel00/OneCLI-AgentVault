"use client";

import { useState } from "react";
import { Brain, Plus, Trash2 } from "lucide-react";
import { Card } from "@agentvault/ui/components/card";
import { Button } from "@agentvault/ui/components/button";
import { Input } from "@agentvault/ui/components/input";
import { Label } from "@agentvault/ui/components/label";
import { Textarea } from "@agentvault/ui/components/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@agentvault/ui/components/dialog";
import { toast } from "sonner";

interface AgentMemoryProps {
  agentName: string;
}

interface MemoryItem {
  id: string;
  key: string;
  title?: string;
  description?: string;
  content: string;
}

export const AgentMemory = ({ agentName }: AgentMemoryProps) => {
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [key, setKey] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = () => {
    if (!key.trim() || !content.trim()) {
      toast.error("Please provide both a Key and Content for the memory.");
      return;
    }

    const newMemory: MemoryItem = {
      id: Date.now().toString(),
      key: key.trim().toLowerCase().replace(/\s+/g, "-"),
      title: title.trim() || undefined,
      description: description.trim() || undefined,
      content: content.trim(),
    };

    setMemories((prev) => [newMemory, ...prev]);
    setIsDialogOpen(false);
    setKey("");
    setTitle("");
    setDescription("");
    setContent("");
    toast.success("Memory created successfully");
  };

  const handleDelete = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
    toast.success("Memory deleted");
  };

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Memory
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
            What {agentName} has learned and saved. It writes here through its
            memory tools and by editing its memory files; your edits are live
            from its next read.
          </p>
        </div>
        {memories.length > 0 && (
          <Button
            size="sm"
            onClick={() => setIsDialogOpen(true)}
            className="cursor-pointer gap-1.5"
          >
            <Plus className="size-4" />
            New memory
          </Button>
        )}
      </div>

      {memories.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-border/70 bg-card/40 rounded-2xl min-h-[300px]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/60 text-muted-foreground mb-4">
            <Brain className="size-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">
            Nothing remembered yet
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 max-w-md">
            Teach it in chat (&quot;remember that our staging URL is ...&quot;)
            or add one here yourself.
          </p>
          <Button
            size="sm"
            onClick={() => setIsDialogOpen(true)}
            className="mt-5 cursor-pointer gap-1.5"
          >
            <Plus className="size-4" />
            New memory
          </Button>
        </Card>
      ) : (
        <div className="grid gap-3">
          {memories.map((m) => (
            <Card
              key={m.id}
              className="p-5 border-border/80 bg-card/60 backdrop-blur-sm space-y-2 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-brand px-1.5 py-0.5 rounded bg-brand/10">
                      {m.key}
                    </span>
                    {m.title && (
                      <span className="text-sm font-medium text-foreground">
                        {m.title}
                      </span>
                    )}
                  </div>
                  {m.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {m.description}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(m.id)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive size-7 cursor-pointer transition-opacity"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-foreground/90 font-mono bg-muted/30 p-2.5 rounded-md leading-relaxed whitespace-pre-wrap">
                {m.content}
              </p>
            </Card>
          ))}
        </div>
      )}

      {/* New memory Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[540px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              New memory
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
              A durable fact the agent carries into every conversation.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="memory-key" className="text-xs font-medium">
                Key
              </Label>
              <Input
                id="memory-key"
                placeholder="deploy-notes"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="font-mono text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="memory-title" className="text-xs font-medium">
                Title (optional)
              </Label>
              <Input
                id="memory-title"
                placeholder="Deploy notes"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="memory-desc" className="text-xs font-medium">
                Description (optional)
              </Label>
              <Input
                id="memory-desc"
                placeholder="One line: the agent's index entry"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="memory-content" className="text-xs font-medium">
                Content
              </Label>
              <Textarea
                id="memory-content"
                rows={5}
                placeholder="Markdown. Facts, decisions, findings. Never credentials."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="text-xs leading-relaxed font-mono"
              />
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
