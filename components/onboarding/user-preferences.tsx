"use client"

import { useLanguage } from "@/hooks/useLanguage"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function UserPreferences({ formData, setFormData }) {
  const { t } = useLanguage()

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value })
  }

  const handleNotificationChange = (checked: boolean) => {
    setFormData({
      ...formData,
      notificationPreferences: checked ? ["email"] : [],
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="currency">{t("onboarding.currency")}</Label>
        <Select value={formData.currency} onValueChange={(value) => handleChange("currency", value)}>
          <SelectTrigger id="currency">
            <SelectValue placeholder={t("onboarding.selectCurrency")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usd">USD</SelectItem>
            <SelectItem value="eur">EUR</SelectItem>
            <SelectItem value="gbp">GBP</SelectItem>
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
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="ru">Русский</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="theme">{t("onboarding.theme")}</Label>
        <Select value={formData.theme} onValueChange={(value) => handleChange("theme", value)}>
          <SelectTrigger id="theme">
            <SelectValue placeholder={t("onboarding.selectTheme")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">{t("onboarding.lightTheme")}</SelectItem>
            <SelectItem value="dark">{t("onboarding.darkTheme")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="notifications"
          checked={formData.notificationPreferences.includes("email")}
          onCheckedChange={handleNotificationChange}
        />
        <Label htmlFor="notifications">{t("onboarding.enableNotifications")}</Label>
      </div>
    </div>
  )
}

