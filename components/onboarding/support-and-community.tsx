"use client"

import { useLanguage } from "@/hooks/useLanguage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, HelpCircle, Users, Mail } from "lucide-react"

export function SupportAndCommunity() {
  const { t } = useLanguage()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            {t("onboarding.support.tutorials")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{t("onboarding.support.tutorials")}</CardDescription>
          <Button variant="outline" className="mt-4">
            View Tutorials
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="w-5 h-5 mr-2" />
            {t("onboarding.support.faqs")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{t("onboarding.support.faqs")}</CardDescription>
          <Button variant="outline" className="mt-4">
            View FAQs
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            {t("onboarding.support.community")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{t("onboarding.support.community")}</CardDescription>
          <Button variant="outline" className="mt-4">
            Join Community
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            {t("onboarding.support.newsletter")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{t("onboarding.support.newsletter")}</CardDescription>
          <Button variant="outline" className="mt-4">
            Subscribe
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

