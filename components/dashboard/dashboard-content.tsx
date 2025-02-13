"use client"

import { NetWorthCard } from "./net-worth-card"
import { AssetsLiabilities } from "./assets-liabilities"
import { AssetAllocation } from "./asset-allocation"
import { format } from "date-fns"
import type { DashboardData } from "@/lib/types"

interface DashboardContentProps {
    data: DashboardData
}

export function DashboardContent({ data }: DashboardContentProps) {
    const currentDate = new Date()
    const greeting = getGreeting()

    function getGreeting() {
        const hour = currentDate.getHours()
        if (hour < 12) return "Morning"
        if (hour < 18) return "Afternoon"
        return "Evening"
    }

    return (
        <div className="space-y-8 p-8 bg-main">
            <div>
                <h1 className="text-2xl font-semibold">{greeting}, Josh</h1>
                <p className="text-muted-foreground">{format(currentDate, "EEEE',' MMM d")}</p>
            </div>
            <div className="grid gap-8">
                <NetWorthCard />
                <AssetsLiabilities />
                <AssetAllocation />
            </div>
        </div>
    )
}

