"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { navItems } from "@/lib/nav-config";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@agentvault/ui/components/sidebar";

const SidebarThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          tooltip="Toggle Theme"
          className="cursor-pointer"
        >
          <div className="relative flex size-4 items-center justify-center shrink-0">
            <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </div>
          <span className="font-medium text-sm text-sidebar-foreground/75 group-data-[collapsible=icon]:hidden whitespace-nowrap">
            {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

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
      <SidebarFooter className="flex flex-col gap-2 group-data-[collapsible=icon]:px-0">
        <SidebarThemeToggle />
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
