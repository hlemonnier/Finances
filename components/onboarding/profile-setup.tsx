"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/hooks/useLanguage"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Moon, Sun, Laptop } from "lucide-react"

const regions = [
  { value: "na", label: "North America" },
  { value: "eu", label: "Europe" },
  { value: "uk", label: "United Kingdom" },
  { value: "asia", label: "Asia Pacific" },
  { value: "latam", label: "Latin America" },
  { value: "mena", label: "Middle East & North Africa" },
  { value: "ssa", label: "Sub-Saharan Africa" },
  { value: "oce", label: "Oceania" },
]

const languages = [
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
  { value: "ru", label: "Русский" },
]

export function ProfileSetup({ formData, setFormData, setLanguage }) {
  const { t } = useLanguage()
  const { theme, setTheme } = useTheme()

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value })
    if (key === "language") {
      setLanguage(value)
    }
    if (key === "theme") {
      setTheme(value)
    }
  }

  useEffect(() => {
    // Set initial theme to light
    setTheme(formData.theme || "light")
  }, [formData.theme, setTheme])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="financialGoal">{t("onboarding.profileSetup.financialGoal")}</Label>
        <Select value={formData.financialGoal} onValueChange={(value) => handleChange("financialGoal", value)}>
          <SelectTrigger id="financialGoal">
            <SelectValue placeholder={t("onboarding.profileSetup.financialGoal")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="budgeting">{t("onboarding.profileSetup.budgeting")}</SelectItem>
            <SelectItem value="saving">{t("onboarding.profileSetup.saving")}</SelectItem>
            <SelectItem value="investing">{t("onboarding.profileSetup.investing")}</SelectItem>
            <SelectItem value="debtManagement">{t("onboarding.profileSetup.debtManagement")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="currency">{t("onboarding.profileSetup.currency")}</Label>
        <Select value={formData.currency} onValueChange={(value) => handleChange("currency", value)}>
          <SelectTrigger id="currency">
            <SelectValue placeholder={t("onboarding.profileSetup.currency")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usd">USD - US Dollar</SelectItem>
            <SelectItem value="eur">EUR - Euro</SelectItem>
            <SelectItem value="gbp">GBP - British Pound</SelectItem>
            <SelectItem value="jpy">JPY - Japanese Yen</SelectItem>
            <SelectItem value="cny">CNY - Chinese Yuan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="region">{t("onboarding.profileSetup.region")}</Label>
        <Select value={formData.region} onValueChange={(value) => handleChange("region", value)}>
          <SelectTrigger id="region">
            <SelectValue placeholder={t("onboarding.profileSetup.region")} />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region.value} value={region.value}>
                {region.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="language">{t("onboarding.language")}</Label>
        <Select value={formData.language} onValueChange={(value) => handleChange("language", value)}>
          <SelectTrigger id="language">
            <SelectValue placeholder={t("onboarding.selectLanguage")} />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>{t("onboarding.profileSetup.theme")}</Label>
        <div className="grid grid-cols-3 gap-4">
          {["light", "dark", "system"].map((themeOption) => (
            <Card
              key={themeOption}
              className={`cursor-pointer transition-all ${
                formData.theme === themeOption || (themeOption === "light" && !formData.theme) ? "border-primary" : ""
              }`}
              onClick={() => handleChange("theme", themeOption)}
            >
              <CardContent className="flex flex-col items-center justify-center p-4">
                {themeOption === "light" && <Sun className="w-6 h-6 mb-2" />}
                {themeOption === "dark" && <Moon className="w-6 h-6 mb-2" />}
                {themeOption === "system" && <Laptop className="w-6 h-6 mb-2" />}
                <span className="text-sm font-medium">{t(`onboarding.profileSetup.${themeOption}Theme`)}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

