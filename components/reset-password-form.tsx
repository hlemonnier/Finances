"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/hooks/useLanguage"
import { resetPassword } from "@/app/actions/auth"
import { PasswordStrengthIndicator } from "./password-strength"
import type React from "react"

export function ResetPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const { toast } = useToast()
    const { t } = useLanguage()
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    // Calculate password strength
    const calculateStrength = (pass: string): number => {
        let strength = 0
        if (pass.length >= 8) strength += 25
        if (/\d/.test(pass)) strength += 25
        if (/[a-z]/.test(pass)) strength += 25
        if (/[A-Z]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) strength += 25
        return strength
    }

    const isPasswordStrong = calculateStrength(password) === 100
    const doPasswordsMatch = password === confirmPassword
    const isFormValid = isPasswordStrong && doPasswordsMatch && password.length > 0

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!isFormValid) {
            toast({
                variant: "destructive",
                title: t("resetPassword.errorTitle"),
                description: !isPasswordStrong ? t("resetPassword.weakPassword") : t("resetPassword.passwordsMismatch"),
            })
            return
        }

        if (!token) {
            toast({
                variant: "destructive",
                title: t("resetPassword.errorTitle"),
                description: t("resetPassword.invalidToken"),
            })
            return
        }

        setIsLoading(true)

        try {
            const result = await resetPassword(token, password)
            if (result.success) {
                toast({
                    title: t("resetPassword.successTitle"),
                    description: t("resetPassword.successDescription"),
                })
                router.push("/login")
            } else {
                toast({
                    variant: "destructive",
                    title: t("resetPassword.errorTitle"),
                    description: result.error || t("resetPassword.errorDescription"),
                })
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: t("resetPassword.errorTitle"),
                description: t("resetPassword.errorDescription"),
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">{t("resetPassword.title")}</h1>
                <p className="text-balance text-sm text-muted-foreground">{t("resetPassword.description")}</p>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="password">{t("resetPassword.newPasswordLabel")}</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <PasswordStrengthIndicator password={password} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">{t("resetPassword.confirmPasswordLabel")}</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {confirmPassword && !doPasswordsMatch && (
                        <p className="text-sm text-destructive">{t("resetPassword.passwordsMismatch")}</p>
                    )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading || !isFormValid}>
                    {isLoading ? t("resetPassword.resetting") : t("resetPassword.resetButton")}
                </Button>
            </div>
            <div className="text-center text-sm">
                <a href="/login" className="underline underline-offset-4">
                    {t("resetPassword.backToLogin")}
                </a>
            </div>
        </form>
    )
}

