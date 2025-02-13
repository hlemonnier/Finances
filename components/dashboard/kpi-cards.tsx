import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Wallet } from "lucide-react"

const kpis = [
  {
    title: "Solde global",
    value: "5 230,50 €",
    icon: Wallet,
    trend: "+2.5%",
    trendUp: true,
  },
  {
    title: "Dépenses du mois",
    value: "1 875,20 €",
    icon: DollarSign,
    trend: "-4.3%",
    trendUp: false,
  },
  {
    title: "Économies",
    value: "12 650,00 €",
    icon: TrendingUp,
    trend: "+12.7%",
    trendUp: true,
  },
]

export function KPICards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
            <kpi.icon className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className={`text-xs ${kpi.trendUp ? "text-green-500" : "text-red-500"}`}>{kpi.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

