"use client"

import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { BarChart4, PieChart, Wallet, Target, ArrowRight, Bell, Sparkles, Zap, TrendingUp, Shield } from "lucide-react"
import { useState } from "react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

export function DashboardIntroduction() {
  const { t } = useLanguage()
  const [activeFeature, setActiveFeature] = useState<number | null>(null)

  const features = [
    {
      icon: BarChart4,
      title: t("onboarding.dashboardFeature1"),
      description: t("onboarding.dashboardFeature1"),
      color: "from-blue-500 to-cyan-400",
      stats: [
        { icon: TrendingUp, label: "+27% Growth", value: "This Month" },
        { icon: Zap, label: "Real-time", value: "Updates" },
      ],
    },
    {
      icon: PieChart,
      title: t("onboarding.dashboardFeature2"),
      description: t("onboarding.dashboardFeature2"),
      color: "from-purple-500 to-pink-400",
      stats: [
        { icon: Shield, label: "Smart", value: "Analytics" },
        { icon: Sparkles, label: "AI-Powered", value: "Insights" },
      ],
    },
    {
      icon: Wallet,
      title: t("onboarding.dashboardFeature3"),
      description: t("onboarding.dashboardFeature3"),
      color: "from-green-500 to-emerald-400",
      stats: [
        { icon: Bell, label: "Instant", value: "Notifications" },
        { icon: Target, label: "Custom", value: "Goals" },
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
        <h2 className="text-4xl font-bold tracking-tight">{t("onboarding.dashboardIntroduction")}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("onboarding.dashboardIntroductionDescription")}
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={item}
            onHoverStart={() => setActiveFeature(index)}
            onHoverEnd={() => setActiveFeature(null)}
          >
            <Card className="relative overflow-hidden group h-full">
              <CardContent className="p-6">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${feature.color}`}
                />

                {/* Icon with gradient background */}
                <div className={`relative w-12 h-12 mb-6 rounded-lg bg-gradient-to-br ${feature.color} p-2.5`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground mb-4">{feature.description}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {feature.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="space-y-1">
                      <div className="flex items-center text-muted-foreground">
                        <stat.icon className="w-4 h-4 mr-1.5" />
                        <span className="text-sm">{stat.label}</span>
                      </div>
                      <div className="text-sm font-medium">{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Animated Arrow */}
                <div className="absolute bottom-6 right-6">
                  <motion.div
                    animate={{
                      x: activeFeature === index ? 5 : 0,
                      opacity: activeFeature === index ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Message */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-center">
        <p className="text-lg text-muted-foreground">{t("onboarding.enjoyApp")}</p>
      </motion.div>

      {/* Interactive Demo Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="relative mt-12 rounded-xl overflow-hidden bg-muted/50 border aspect-video"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/20 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center space-y-4">
            <Sparkles className="w-12 h-12 text-primary mx-auto" />
            <p className="text-xl font-medium">{t("onboarding.dashboardPreview")}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

