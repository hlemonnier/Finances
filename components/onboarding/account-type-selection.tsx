"use client"

import { useLanguage } from "@/hooks/useLanguage"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function AccountTypeSelection({ formData, setFormData }) {
  const { t } = useLanguage()

  const handleChange = (value: string) => {
    setFormData({ ...formData, accountType: value })
  }

  return (
      <div>
        <RadioGroup value={formData.accountType} onValueChange={handleChange} className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="personal" id="personal" />
            <Label htmlFor="personal">{t("onboarding.personalAccount")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="business" id="business" />
            <Label htmlFor="business">{t("onboarding.businessAccount")}</Label>
          </div>
        </RadioGroup>
      </div>
  )
}
