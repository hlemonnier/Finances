"use client"

import type React from "react"
import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"
import { SidebarProvider } from "@/components/ui/sidebar"
import type { DashboardData } from "@/lib/types"

interface DashboardShellProps {
    children: React.ReactNode
    initialData: DashboardData
}

export function DashboardShell({ children, initialData }: DashboardShellProps) {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-full overflow-hidden bg-gray-100">
                <Sidebar initialData={initialData} />
                <div className="flex flex-1 flex-col">
                    <Topbar />
                    <main className="flex-1 overflow-auto p-4">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    )
}

