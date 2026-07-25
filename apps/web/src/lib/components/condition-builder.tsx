"use client";

import type { RuleCondition } from "@agentvault/api/validations/policy-rule";

export interface ConditionBuilderProps {
  conditions: RuleCondition[];
  onChange: (conditions: RuleCondition[]) => void;
}

export const ConditionBuilder = ({}: ConditionBuilderProps) => (
  <div className="rounded-md border border-dashed px-3 py-2.5">
    <p className="text-xs text-muted-foreground">
      Match conditions (body content, headers) are available on{" "}
      <a
        href="https://app.agentvault.sh"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        AgentVault Cloud
      </a>
      .
    </p>
  </div>
);
