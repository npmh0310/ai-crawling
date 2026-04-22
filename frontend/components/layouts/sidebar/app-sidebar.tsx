"use client"

import * as React from "react"
import { useTranslations } from "next-intl"

import { NavDocuments } from "@/components/layouts/navigation/nav-documents"
import { NavMain } from "@/components/layouts/navigation/nav-main"
import { NavSecondary } from "@/components/layouts/navigation/nav-secondary"
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
  CircleHelpIcon,
  CommandIcon,
  LayoutDashboardIcon,
  LayoutListIcon,
  Settings2Icon,
  Table2Icon,
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
      title: t("dashboard"),
      url: "/",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: t("tab2"),
      url: "/tab2",
      icon: <LayoutListIcon />,
    },
    {
      title: t("tab3"),
      url: "/tab3",
      icon: <Table2Icon />,
    },
  ]

  const navSecondary = [
    {
      title: t("settings"),
      url: "#",
      icon: <Settings2Icon />,
    },
    {
      title: t("getHelp"),
      url: "#",
      icon: <CircleHelpIcon />,
    },
  ]

  const documents = [
    {
      name: t("dataLibrary"),
      url: "#",
      icon: <CommandIcon />,
    },
  ]

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="#" />}
            >
              <CommandIcon className="size-5!" />
              <span className="text-base font-semibold">{tApp("name")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavDocuments items={documents} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
