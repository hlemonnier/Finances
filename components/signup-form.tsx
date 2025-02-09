"use client"

import { useTransition, useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signup } from "@/app/actions/auth"
import { useToast } from "@/components/ui/use-toast"
import { PasswordStrengthIndicator } from "./password-strength"
import { useLanguage } from "@/hooks/useLanguage"
import type React from "react"

export function SignUpForm({
  className,
  onSwitchToLogin,
  ...props
}: React.ComponentPropsWithoutRef<"form"> & { onSwitchToLogin: () => void }) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const [password, setPassword] = useState("")
  const { t } = useLanguage()
  const router = useRouter()
  const [confirmPassword, setConfirmPassword] = useState("")
  const doPasswordsMatch = password === confirmPassword
  const calculateStrength = (pass: string): number => {
    let strength = 0
    if (pass.length >= 8) strength += 25
    if (/\d/.test(pass)) strength += 25
    if (/[a-z]/.test(pass)) strength += 25
    if (/[A-Z]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) strength += 25
    return strength
  }
  const isPasswordStrong = calculateStrength(password) === 100
  const isFormValid = isPasswordStrong && doPasswordsMatch && password.length > 0

  async function handleSubmit(formData: FormData) {
    if (!isFormValid) {
      toast({
        variant: "destructive",
        title: t("signup.errorTitle"),
        description: !isPasswordStrong ? t("signup.weakPassword") : t("signup.passwordsMismatch"),
      })
      return
    }
    startTransition(async () => {
      const result = await signup(formData)
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        })
      } else if (result.success) {
        router.push("/onboarding")
      }
    })
  }

  return (
    <form action={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{t("signup.title")}</h1>
        <p className="text-balance text-sm text-muted-foreground">{t("signup.emailLabel")}</p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="firstName">{t("signup.firstNameLabel")}</Label>
          <Input id="firstName" name="firstName" type="text" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">{t("signup.emailLabel")}</Label>
          <Input id="email" name="email" type="email" placeholder={t("common.emailPlaceholder")} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">{t("signup.passwordLabel")}</Label>
          <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">{t("signup.confirmPasswordLabel")}</Label>
          <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPassword && !doPasswordsMatch && (
              <p className="text-sm text-destructive">{t("signup.passwordsMismatch")}</p>
          )}
          <PasswordStrengthIndicator password={password} />
        </div>
        <Button type="submit" className="w-full" disabled={isPending || !isFormValid}>
          {isPending ? "Creating account..." : t("signup.signUpButton")}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">{t("signup.orContinueWith")}</span>
        </div>
        <div className="grid gap-2">
          <Button variant="outline" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {t("common.signUpWith")} Google
          </Button>
          <Button variant="outline" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
              <path
                d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.07-.48-2.05-.48-3.12 0-1.39.64-2.39.51-3.31-.41-5.46-5.93-4.48-14.45 1.83-14.73 1.39.06 2.39.72 3.19.72.77 0 2.22-.79 3.74-.67 1.43.11 2.5.57 3.23 1.45-2.86 1.79-2.4 5.87.95 7.36-1.1 2.93-2.68 5.84-3.43 6.87zm-3.23-19.83c-2.15.13-4.02 2.17-3.74 4.47 1.98.11 4.02-2.05 3.74-4.47z"
                fill="currentColor"
              />
            </svg>
            {t("common.signUpWith")} Apple
          </Button>
        </div>
      </div>
      <div className="text-center text-sm">
        {t("signup.haveAccount")}{" "}
        <button type="button" onClick={onSwitchToLogin} className="underline underline-offset-4">
          {t("signup.login")}
        </button>
      </div>
    </form>
  )
}

