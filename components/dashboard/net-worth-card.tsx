"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from "recharts"

const data = [
  { date: "Jan 01", value: 2807114 },
  { date: "Jan 02", value: 2808000 },
  { date: "Jan 03", value: 2809500 },
  { date: "Jan 04", value: 2808200 },
  { date: "Jan 05", value: 2808491 },
]

export function NetWorthCard() {
  const currentValue = data[data.length - 1].value
  const previousValue = data[0].value
  const change = currentValue - previousValue
  const percentChange = ((change / previousValue) * 100).toFixed(1)
  const isPositive = change > 0

  return (
    <Card>
      <CardHeader>
        <div className="space-y-1">
          <h2 className="text-sm font-medium text-muted-foreground">Net Worth</h2>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-bold">${currentValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            <p className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? "+" : "-"}${Math.abs(change).toLocaleString("en-US")} ({percentChange}%) vs last month
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" hide />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Value</span>
                            <span className="font-bold">${payload[0].value.toLocaleString()}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                            <span className="font-bold">{payload[0].payload.date}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

