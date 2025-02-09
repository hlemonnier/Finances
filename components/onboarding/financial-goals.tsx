"use client"

import { useState } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Target, Trash2 } from "lucide-react"

export function FinancialGoals({ formData, setFormData }) {
  const { t } = useLanguage()
  const [goalName, setGoalName] = useState("")
  const [goalAmount, setGoalAmount] = useState("")

  const handleAddGoal = () => {
    if (goalName && goalAmount) {
      const newGoal = { name: goalName, amount: Number.parseFloat(goalAmount) }
      setFormData({
        ...formData,
        financialGoals: [...(formData.financialGoals || []), newGoal],
      })
      setGoalName("")
      setGoalAmount("")
    }
  }

  const handleRemoveGoal = (index: number) => {
    const newGoals = [...formData.financialGoals]
    newGoals.splice(index, 1)
    setFormData({
      ...formData,
      financialGoals: newGoals,
    })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="text-center space-y-4">
        <Target className="w-12 h-12 mx-auto text-primary" />
        <p className="text-lg text-muted-foreground">{t("onboarding.financialGoalsDescription")}</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="goalName">{t("onboarding.goalName")}</Label>
              <Input
                id="goalName"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder={t("onboarding.enterGoalName")}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goalAmount">{t("onboarding.goalAmount")}</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {formData.currency?.toUpperCase() || "$"}
                </span>
                <Input
                  id="goalAmount"
                  type="number"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                  className="pl-10 h-12"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
          <Button onClick={handleAddGoal} disabled={!goalName || !goalAmount} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            {t("onboarding.addGoal")}
          </Button>
        </CardContent>
      </Card>

      {formData.financialGoals?.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <h3 className="font-semibold text-lg">{t("onboarding.yourGoals")}</h3>
          <AnimatePresence>
            {formData.financialGoals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div>
                  <p className="font-medium">{goal.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formData.currency?.toUpperCase() || "$"} {goal.amount.toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveGoal(index)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  )
}

