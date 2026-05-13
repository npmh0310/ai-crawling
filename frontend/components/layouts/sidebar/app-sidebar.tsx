"use client"

import * as React from "react"
import { useTranslations } from "next-intl"

import { NavMain } from "@/components/layouts/navigation/nav-main"
import { NavUser } from "@/components/layouts/navigation/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  BookOpenIcon,
  CommandIcon,
  LayoutDashboardIcon,
  ZapIcon,
} from "lucide-react"

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("navigation")
  const tApp = useTranslations("app")

  const navMain = [
    {
      title: t("neuralFeed"),
      url: "/",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: t("flashAlerts"),
      url: "/flash-alerts",
      icon: <ZapIcon />,
    },
    {
      title: t("research"),
      url: "/research",
      icon: <BookOpenIcon />,
    },
  ]

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="h-(--header-height)">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5! h-(--header-height)"
              render={<a href="#" />}
            >
              <CommandIcon className="size-5!" />
              <span className="text-base font-semibold">{tApp("name")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} label={t("mainStream")} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
