import type { Metadata } from "next"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { fetchDashboardData } from "../actions/dashboard"

export const metadata: Metadata = {
    title: "Dashboard | Finance Dash",
    description: "Your personal finance dashboard",
}

export default async function DashboardPage() {
    const dashboardData = await fetchDashboardData()

    return (
        <DashboardShell initialData={dashboardData}>
            <DashboardContent data={dashboardData} />
        </DashboardShell>
    )
}

