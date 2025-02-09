"use client"

import { useLanguage } from "@/hooks/useLanguage"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface WelcomeScreenProps {
  formData: any
  setFormData: (data: any) => void
  onNext?: () => void
  onSkip?: () => void
}

export function WelcomeScreen({ formData, setFormData, onNext, onSkip }: WelcomeScreenProps) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">{t("onboarding.welcome.title")}</h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-[600px] mx-auto">
          {t("onboarding.welcome.subtitle")}
        </p>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
        <Button size="lg" className="h-12 px-8 text-lg" onClick={onNext}>
          {t("onboarding.welcome.getStarted")}
        </Button>
      </motion.div>
    </div>
  )
}

