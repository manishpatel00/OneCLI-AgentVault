"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@agentvault/ui/components/card";
import { Button } from "@agentvault/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@agentvault/ui/components/select";

export const KeyManagementCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Management</CardTitle>
        <CardDescription>
          Select which Key Management System to use for encrypting your project
          data
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Select defaultValue="default">
          <SelectTrigger className="w-full max-w-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default AgentVault KMS</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="secondary" className="w-fit" disabled>
          Save
        </Button>
      </CardContent>
    </Card>
  );
};
