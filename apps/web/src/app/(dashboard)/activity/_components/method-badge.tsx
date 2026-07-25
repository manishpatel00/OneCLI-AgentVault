import { Badge } from "@agentvault/ui/components/badge";

interface MethodBadgeProps {
  method: string;
}

export const MethodBadge = ({ method }: MethodBadgeProps) => (
  <Badge variant="outline" className="font-mono text-xs font-semibold">
    {method}
  </Badge>
);
