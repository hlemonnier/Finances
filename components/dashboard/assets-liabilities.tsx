"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from "recharts"

const assetsData = [
  { date: "Jan 01", value: 2724482 },
  { date: "Jan 02", value: 2725000 },
  { date: "Jan 03", value: 2726500 },
  { date: "Jan 04", value: 2725200 },
  { date: "Jan 05", value: 2724482 },
]

const liabilitiesData = [
  { date: "Jan 01", value: 82304 },
  { date: "Jan 02", value: 82500 },
  { date: "Jan 03", value: 83000 },
  { date: "Jan 04", value: 83500 },
  { date: "Jan 05", value: 84008 },
]

export function AssetsLiabilities() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="space-y-1">
            <h2 className="text-sm font-medium text-muted-foreground">Total Assets</h2>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold">${assetsData[assetsData.length - 1].value.toLocaleString()}</p>
              <p className="text-sm text-green-500">+$871.22 (+2.8%) vs last month</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={assetsData}>
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

      <Card>
        <CardHeader>
          <div className="space-y-1">
            <h2 className="text-sm font-medium text-muted-foreground">Total Liabilities</h2>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold">
                ${liabilitiesData[liabilitiesData.length - 1].value.toLocaleString()}
              </p>
              <p className="text-sm text-red-500">+$1,704.56 (+1.9%) vs last month</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={liabilitiesData}>
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
                <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

