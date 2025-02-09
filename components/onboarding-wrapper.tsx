"use client"

import { useState } from "react"
import { OnboardingWizard } from "./onboarding-wizard"
import { useLanguage } from "@/hooks/useLanguage"
import { Progress } from "@/components/ui/progress"

interface OnboardingWrapperProps {
    userEmail: string
}

export function OnboardingWrapper({ userEmail }: OnboardingWrapperProps) {
    const { t } = useLanguage()
    const [currentStep, setCurrentStep] = useState(1)
    const totalSteps = 3

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="space-y-6">
                <div className="space-y-2">
                    <Progress
                        value={(currentStep / totalSteps) * 100}
                        className="h-2 bg-muted [&>div]:bg-green-500 [&>div]:transition-all [&>div]:duration-300"
                    />
                    <p className="text-sm text-muted-foreground text-center">
                        {t("onboarding.stepIndicator")
                            .replace("{{current}}", currentStep.toString())
                            .replace("{{total}}", totalSteps.toString())}
                    </p>
                </div>
                <OnboardingWizard currentStep={currentStep} setCurrentStep={setCurrentStep} userEmail={userEmail} />
            </div>
        </div>
    )
}

