"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/useLanguage"

export function OnboardingShortcut() {
  const router = useRouter()
  const { t } = useLanguage()

  const handleClick = () => {
    router.push("/onboarding")
  }

  return (
    <Button variant="outline" size="icon" onClick={handleClick} title={t("common.onboardingShortcut")}>
      🚀
    </Button>
  )
}

