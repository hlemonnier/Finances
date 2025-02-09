"use client"

import { useLanguage } from "@/hooks/useLanguage"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Building2, CreditCard, Wallet } from "lucide-react"

export function InitialAccountSetup({ formData, setFormData }) {
  const { t } = useLanguage()

  const handleChange = (key: string, value: string | number) => {
    setFormData({
      ...formData,
      financialAccount: {
        ...formData.financialAccount,
        [key]: value,
      },
    })
  }

  const accountTypes = [
    { value: "bank", icon: Building2, label: t("onboarding.bank") },
    { value: "creditCard", icon: CreditCard, label: t("onboarding.creditCard") },
    { value: "cash", icon: Wallet, label: t("onboarding.cash") },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accountTypes.map(({ value, icon: Icon, label }) => (
          <Card
            key={value}
            className={`cursor-pointer transition-all ${
              formData.financialAccount?.type === value ? "border-primary bg-primary/5" : "hover:border-primary/50"
            }`}
            onClick={() => handleChange("type", value)}
          >
            <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-4">
              <Icon
                className={`w-8 h-8 ${
                  formData.financialAccount?.type === value ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span className="font-medium">{label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="accountName">{t("onboarding.accountName")}</Label>
          <Input
            id="accountName"
            value={formData.financialAccount?.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder={t("onboarding.enterAccountName")}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="balance">{t("onboarding.startingBalance")}</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {formData.currency?.toUpperCase() || "$"}
            </span>
            <Input
              id="balance"
              type="number"
              value={formData.financialAccount?.balance || ""}
              onChange={(e) => handleChange("balance", Number.parseFloat(e.target.value))}
              className="pl-10 h-12"
              placeholder="0.00"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

