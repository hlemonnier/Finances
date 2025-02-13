"use server"

import { getDashboardData } from "@/lib/db/accounts"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

export async function fetchDashboardData() {
    try {
        const session = await getSession()
        if (!session.isLoggedIn) {
            redirect("/login")
        }
        return getDashboardData(session.userId)
    } catch (error) {
        console.error("Error fetching dashboard data:", error)
        redirect("/login")
    }
}

