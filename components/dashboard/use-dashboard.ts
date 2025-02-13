"use client"

import { useState } from "react"
import type { DashboardData, AccountCategory } from "@/lib/types"

export function useDashboard(initialData: DashboardData) {
  const [dashboardData, setDashboardData] = useState<DashboardData>(initialData)

  const toggleCategory = (categoryType: AccountCategory["type"]) => {
    if (!dashboardData) return

    setDashboardData((prev) => ({
      ...prev,
      categories: prev.categories.map((category) =>
          category.type === categoryType ? { ...category, isExpanded: !category.isExpanded } : category,
      ),
    }))
  }

  return {
    data: dashboardData,
    toggleCategory,
  }
}

