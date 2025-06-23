"use client"

import * as React from "react"

import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { BadgeDollarSign, CalendarClock, LayoutDashboardIcon, ShieldCheck, UsersIcon } from "lucide-react"
import { NavMain } from "./nav-main"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/admin",
            icon: LayoutDashboardIcon,
        },
        {
            title: "Quản lý người dùng",
            url: "/admin/users",
            icon: UsersIcon,
        },
        {
            title: "Quản lý phân quyền",
            url: "/admin/roles",
            icon: ShieldCheck,
        },
        {
            title: "Quản lý phỏng vấn",
            url: "/admin/interviews",
            icon: CalendarClock,
        },
        {
            title: "Quản lý thanh toán",
            url: "/admin/pays",
            icon: BadgeDollarSign,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
