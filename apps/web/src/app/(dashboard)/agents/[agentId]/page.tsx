import { Suspense } from "react";
import type { Metadata } from "next";
import { AgentInterface } from "./_components/agent-interface";

export const metadata: Metadata = {
  title: "Agent",
};

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;
  return (
    <Suspense>
      <AgentInterface agentId={agentId} />
    </Suspense>
  );
}
