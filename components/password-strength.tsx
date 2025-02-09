"use client"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/hooks/useLanguage"

export function PasswordStrengthIndicator({ password }: { password: string }) {
  const { t } = useLanguage()

  const calculateStrength = (password: string): number => {
    let strength = 0

    // Length check
    if (password.length >= 8) strength += 25

    // Contains number
    if (/\d/.test(password)) strength += 25

    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 25

    // Contains uppercase or special char
    if (/[A-Z]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength += 25

    return strength
  }

  const strength = calculateStrength(password)

  const getStrengthText = (strength: number) => {
    if (strength === 0) return t("common.veryWeak")
    if (strength <= 25) return t("common.weak")
    if (strength <= 50) return t("common.fair")
    if (strength <= 75) return t("common.good")
    return t("common.strong")
  }

  const getStrengthColor = (strength: number) => {
    if (strength <= 25) return "bg-red-500"
    if (strength <= 50) return "bg-yellow-500"
    if (strength <= 75) return "bg-blue-500"
    return "bg-green-500"
  }

  return (
    <div className="space-y-2">
      <Progress value={strength} className={getStrengthColor(strength)} />
      <p className="text-sm text-muted-foreground">
        {t("common.passwordStrength")}: {getStrengthText(strength)}
      </p>
    </div>
  )
}

