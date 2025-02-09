"use client"

import { useLanguage } from "@/hooks/useLanguage"
import { Button } from "@/components/ui/button"

export function FinalCallToAction() {
  const { t } = useLanguage()

  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-bold">{t("onboarding.callToAction.title")}</h2>
      <div className="space-y-4">
        <Button size="lg" className="w-full">
          {t("onboarding.callToAction.logTransaction")}
        </Button>
        <Button size="lg" className="w-full">
          {t("onboarding.callToAction.setBudget")}
        </Button>
        <Button size="lg" variant="outline" className="w-full">
          {t("onboarding.callToAction.explore")}
        </Button>
      </div>
    </div>
  )
}

