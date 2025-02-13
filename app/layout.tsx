import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/hooks/useLanguage"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Finance Bro Inc.",
    description: "Your personal finance companion",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={inter.className} suppressHydrationWarning>
        <body>
        <LanguageProvider>
            {children}
            <Toaster />
        </LanguageProvider>
        </body>
        </html>
    )
}

