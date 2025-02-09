"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/hooks/useLanguage"
import { WelcomeScreen } from "./onboarding/welcome-screen"
import { ProfileSetup } from "./onboarding/profile-setup"
import { DashboardIntroduction } from "./onboarding/dashboard-introduction"
import { Button } from "@/components/ui/button"
import { saveOnboardingData } from "@/app/actions/user"
import { toast } from "@/components/ui/use-toast"

interface OnboardingWizardProps {
  currentStep: number
  setCurrentStep: (step: number) => void
  userEmail: string
}

export function OnboardingWizard({ currentStep, setCurrentStep, userEmail }: OnboardingWizardProps) {
  const { t, language, setLanguage } = useLanguage()
  const router = useRouter()
  const [formData, setFormData] = useState({
    financialGoal: "",
    currency: "",
    region: "",
    theme: "light",
    language: language,
  })

  const steps = [
    { component: WelcomeScreen, title: t("onboarding.welcome.title") },
    { component: ProfileSetup, title: t("onboarding.profileSetup.title") },
    { component: DashboardIntroduction, title: t("onboarding.step3Title") },
  ]

  const CurrentStepComponent = steps[currentStep - 1].component

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      // Save onboarding data and redirect to dashboard
      try {
        if (!userEmail) {
          throw new Error("User email not available")
        }
        await saveOnboardingData({ ...formData, email: userEmail })
        toast({
          title: t("onboarding.saveSuccess"),
          description: t("onboarding.saveSuccessDescription"),
        })
        router.push("/dashboard")
      } catch (error) {
        console.error("Error saving onboarding data:", error)
        toast({
          title: t("onboarding.saveError"),
          description: t("onboarding.saveErrorDescription"),
          variant: "destructive",
        })
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    setCurrentStep(steps.length)
  }

  return (
      <div className="space-y-8">
        <CurrentStepComponent
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            setLanguage={setLanguage}
        />
        <div className="flex items-center justify-between mt-8">
          {currentStep > 1 && (
              <div className="flex gap-4">
                <Button variant="outline" onClick={handlePrevious}>
                  {t("onboarding.previousButton")}
                </Button>
                <Button onClick={handleNext}>
                  {currentStep < steps.length ? t("onboarding.nextButton") : t("onboarding.finishButton")}
                </Button>
              </div>
          )}
          {currentStep > 1 && currentStep < steps.length - 1 && (
              <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground hover:text-foreground">
                {t("onboarding.skipButton")}
              </Button>
          )}
        </div>
      </div>
  )
}

