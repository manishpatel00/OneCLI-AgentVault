"use client";

import { Plus, Pause } from "lucide-react";
import { Card } from "@agentvault/ui/components/card";
import { Button } from "@agentvault/ui/components/button";
import { Badge } from "@agentvault/ui/components/badge";

interface AgentSchedulesProps {
  agentName: string;
}

export const AgentSchedules = ({ agentName }: AgentSchedulesProps) => {
  const schedules = [
    {
      id: "1",
      name: "Daily Security Audit & Report",
      cron: "0 9 * * 1-5",
      scheduleText: "Every weekday at 9:00 AM",
      status: "Active",
      lastRun: "Today at 9:00 AM",
    },
    {
      id: "2",
      name: "Stripe Failed Payments Triage",
      cron: "*/30 * * * *",
      scheduleText: "Every 30 minutes",
      status: "Active",
      lastRun: "12 minutes ago",
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Autonomous Schedules
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Configure automated cron tasks and periodic runs for {agentName}.
          </p>
        </div>
        <Button size="sm" className="text-xs gap-1.5 cursor-pointer">
          <Plus className="size-3.5" />
          Add Schedule
        </Button>
      </div>

      <div className="grid gap-3">
        {schedules.map((s) => (
          <Card
            key={s.id}
            className="p-5 flex items-center justify-between gap-4 border-border/80 bg-card/80 backdrop-blur-sm"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-foreground">
                  {s.name}
                </span>
                <Badge
                  variant="outline"
                  className="text-[10px] text-emerald-500 border-emerald-500/30 bg-emerald-500/10"
                >
                  {s.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-[11px]">
                  {s.cron}
                </code>
                <span>{s.scheduleText}</span>
                <span>Last run: {s.lastRun}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="size-8">
                <Pause className="size-3.5 text-muted-foreground" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
