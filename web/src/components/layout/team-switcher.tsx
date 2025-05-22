"use client"

import * as React from "react"
import { Shield } from "lucide-react"

import {
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function TeamSwitcher() {

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div
                    className="flex gap-x-2 items-center"
                >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <Shield className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-lg leading-tight">
                        <span className="truncate font-semibold">
                            Admin Dashboard
                        </span>
                    </div>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
