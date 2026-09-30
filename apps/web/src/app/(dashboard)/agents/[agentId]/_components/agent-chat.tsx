"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Info, Bot, RotateCw } from "lucide-react";
import { Button } from "@agentvault/ui/components/button";
import { cn } from "@agentvault/ui/lib/utils";

interface AgentChatProps {
  agent: {
    id: string;
    name: string;
    identifier: string;
    accessToken: string;
    isDefault: boolean;
  };
  onOpenTab: (tab: string) => void;
}

interface Message {
  id: string;
  sender: "user" | "agent" | "system-error";
  text: string;
  timestamp: string;
}

export const AgentChat = ({ agent, onOpenTab }: AgentChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "user",
      text: "hii",
      timestamp: "2h ago",
    },
    {
      id: "2",
      sender: "system-error",
      text: "The agent's model provider rejected the request. This is usually a usage limit or an expired key. Check the connected model key, or connect a different one, then send your message again.",
      timestamp: "2h ago",
    },
    {
      id: "3",
      sender: "user",
      text: "hii",
      timestamp: "1h ago",
    },
    {
      id: "4",
      sender: "system-error",
      text: "The agent's model provider rejected the request. This is usually a usage limit or an expired key. Check the connected model key, or connect a different one, then send your message again.",
      timestamp: "1h ago",
    },
    {
      id: "5",
      sender: "user",
      text: "hii",
      timestamp: "30m ago",
    },
    {
      id: "6",
      sender: "system-error",
      text: "The agent's model provider rejected the request. This is usually a usage limit or an expired key. Check the connected model key, or connect a different one, then send your message again.",
      timestamp: "30m ago",
    },
    {
      id: "7",
      sender: "user",
      text: "hh",
      timestamp: "Just now",
    },
    {
      id: "8",
      sender: "system-error",
      text: "The agent's model provider rejected the request. This is usually a usage limit or an expired key. Check the connected model key, or connect a different one, then send your message again.",
      timestamp: "Just now",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: trimmed,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate agent response / gateway key check
    setTimeout(() => {
      setIsTyping(false);
      const isGatewayTest =
        trimmed.toLowerCase().includes("status") ||
        trimmed.toLowerCase().includes("test");

      if (isGatewayTest) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "agent",
            text: `Agent "${agent.name}" (${agent.identifier}) is running. Connected to AgentVault gateway with token ${agent.accessToken.slice(0, 10)}... Injected credentials and network proxy policies are active.`,
            timestamp: "Just now",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "system-error",
            text: "The agent's model provider rejected the request. This is usually a usage limit or an expired key. Check the connected model key, or connect a different one, then send your message again.",
            timestamp: "Just now",
          },
        ]);
      }
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col min-h-0 bg-background">
      {/* Messages Scroll Area */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto px-4 py-6 sm:px-8 space-y-6"
      >
        <div className="mx-auto max-w-3xl space-y-5">
          {messages.map((msg) => {
            if (msg.sender === "user") {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="group relative max-w-[80%] rounded-2xl rounded-tr-xs bg-zinc-900 text-zinc-100 dark:bg-zinc-800 dark:text-zinc-100 px-4 py-2.5 text-sm sm:text-[14.5px] shadow-sm">
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {msg.text}
                    </p>
                    <span className="mt-1 block text-[10px] text-zinc-400 text-right select-none opacity-70">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            }

            if (msg.sender === "system-error") {
              return (
                <div key={msg.id} className="flex justify-start">
                  <div className="w-full max-w-xl rounded-xl border border-border/80 bg-card/60 dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs backdrop-blur-sm space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <Info className="size-3.5" />
                      </div>
                      <p className="text-xs sm:text-[13.5px] text-muted-foreground leading-relaxed">
                        {msg.text}
                      </p>
                    </div>
                    <div className="pl-7.5">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onOpenTab("models")}
                        className="h-8 text-xs font-medium cursor-pointer shadow-xs hover:bg-muted"
                      >
                        Check the model key
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className="flex justify-start items-start gap-3"
              >
                <div className="size-8 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0 mt-0.5">
                  <Bot className="size-4" />
                </div>
                <div className="max-w-[80%] rounded-2xl rounded-tl-xs bg-muted/60 border border-border/60 px-4 py-3 text-sm text-foreground shadow-xs">
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {msg.text}
                  </p>
                  <span className="mt-1 block text-[10px] text-muted-foreground select-none">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-muted-foreground text-xs pl-2">
              <RotateCw className="size-3 animate-spin text-brand" />
              <span>{agent.name} is connecting through gateway...</span>
            </div>
          )}
        </div>
      </div>

      {/* Pinned Bottom Input Bar */}
      <div className="shrink-0 border-t border-border/70 bg-card/40 dark:bg-[#0c1017]/80 p-3 sm:p-4 backdrop-blur-md">
        <div className="mx-auto max-w-3xl">
          <div className="relative flex items-center gap-2 rounded-2xl border border-border/80 dark:border-zinc-800 bg-background/90 px-3 py-2 shadow-sm focus-within:border-ring focus-within:ring-1 focus-within:ring-ring">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-foreground shrink-0 rounded-full"
              title="Attach context or files"
            >
              <Paperclip className="size-4 -rotate-45" />
            </Button>

            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message your agent..."
              className="flex-1 resize-none bg-transparent px-1 py-1 text-sm outline-none placeholder:text-muted-foreground/70 min-h-[24px] max-h-[120px]"
            />

            <Button
              type="button"
              size="icon"
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className={cn(
                "size-8 shrink-0 rounded-xl transition-all",
                input.trim()
                  ? "bg-foreground text-background hover:bg-foreground/90 shadow-xs"
                  : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed",
              )}
              title="Send message"
            >
              <Send className="size-3.5" />
            </Button>
          </div>
          <div className="mt-1.5 flex items-center justify-between px-2 text-[11px] text-muted-foreground/70">
            <span>Press Enter to send, Shift + Enter for new line</span>
            <span className="font-mono text-[10px]">Gateway Proxy: Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
