"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/hooks/useLanguage"
import { requestPasswordReset } from "@/app/actions/auth"
import type React from "react"

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const { t } = useLanguage()
    const router = useRouter()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const email = formData.get("email") as string

        try {
            const result = await requestPasswordReset(email)
            if (result.success) {
                toast({
                    title: t("forgotPassword.successTitle"),
                    description: t("forgotPassword.successDescription"),
                })
                router.push("/login")
            } else {
                toast({
                    variant: "destructive",
                    title: t("forgotPassword.errorTitle"),
                    description: result.error || t("forgotPassword.errorDescription"),
                })
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: t("forgotPassword.errorTitle"),
                description: t("forgotPassword.errorDescription"),
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">{t("forgotPassword.title")}</h1>
                <p className="text-balance text-sm text-muted-foreground">{t("forgotPassword.description")}</p>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">{t("forgotPassword.emailLabel")}</Label>
                    <Input id="email" name="email" type="email" placeholder={t("common.emailPlaceholder")} required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? t("forgotPassword.submitting") : t("forgotPassword.submitButton")}
                </Button>
            </div>
            <div className="text-center text-sm">
                <a href="/login" className="underline underline-offset-4">
                    {t("forgotPassword.backToLogin")}
                </a>
            </div>
        </form>
    )
}

