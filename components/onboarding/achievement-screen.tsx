"use client"

import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"

export function AchievementScreen() {
  const { t } = useLanguage()

  return (
    <div className="text-center space-y-6">
      <Trophy className="w-16 h-16 mx-auto text-yellow-400" />
      <h2 className="text-2xl font-bold">{t("onboarding.achievement.title")}</h2>
      <p>{t("onboarding.achievement.description")}</p>
      <Card>
        <CardHeader>
          <CardTitle>{t("onboarding.achievement.firstMilestone")}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{t("onboarding.achievement.firstMilestone")}</CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}

