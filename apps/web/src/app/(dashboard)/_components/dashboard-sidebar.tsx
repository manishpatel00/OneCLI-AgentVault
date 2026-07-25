"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { navItems } from "@/lib/nav-config";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@agentvault/ui/components/sidebar";

export const DashboardSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader className="h-12 justify-center group-data-[collapsible=icon]:px-0">
        <Link
          href="/"
          className="flex items-center gap-2 px-2"
        >
          <Image
            src="/agentvault-logo.png"
            alt="AgentVault"
            width={24}
            height={24}
            priority
            className="shrink-0"
          />
          <span className="font-bold text-sm tracking-tight group-data-[collapsible=icon]:hidden whitespace-nowrap">
            Onecli-AgentVault
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter className="justify-center group-data-[collapsible=icon]:px-0">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
