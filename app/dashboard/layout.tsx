import { getUserPreferences } from "@/lib/db/user-preferences"
import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"

export default async function DashboardLayout({
                                                  children,
                                              }: {
    children: React.ReactNode
}) {
    const session = await getSession()
    if (!session.isLoggedIn) {
        redirect("/login")
    }

    const userPreferences = await getUserPreferences(session.userId)
    if (!userPreferences) {
        redirect("/login")
    }

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme={userPreferences.theme_mode}
            enableSystem={false}
            disableTransitionOnChange
            forcedTheme={userPreferences.theme_mode}
        >
            {children}
        </ThemeProvider>
    )
}

