"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const assets = [
  {
    name: "Cash",
    items: 3,
    percentage: 9.74,
    value: 48534.22,
    change: 1553.43,
    changePercentage: 0.9,
    color: "#9333ea",
  },
  {
    name: "Investments",
    items: 6,
    percentage: 37.67,
    value: 1120448.63,
    change: 8221.66,
    changePercentage: 4.2,
    color: "#3b82f6",
  },
  {
    name: "Crypto",
    items: 3,
    percentage: 14.11,
    value: 190771.22,
    change: -4221.71,
    changePercentage: -9.1,
    color: "#06b6d4",
  },
  {
    name: "Real Estate",
    items: 2,
    percentage: 38.48,
    value: 1320448.12,
    change: 44553.43,
    changePercentage: 6.2,
    color: "#ec4899",
  },
]

export function AssetAllocation() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-sm font-medium">Assets</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium">New</button>
            <select className="text-sm border-0 bg-transparent font-medium">
              <option>1M</option>
              <option>3M</option>
              <option>6M</option>
              <option>1Y</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex h-4 w-full overflow-hidden rounded-full">
            {assets.map((asset) => (
              <div
                key={asset.name}
                className="h-full transition-all"
                style={{
                  width: `${asset.percentage}%`,
                  backgroundColor: asset.color,
                }}
              />
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {assets.map((asset) => (
              <div key={asset.name} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: asset.color }} />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{asset.name}</span>
                  <span className="text-xs text-muted-foreground">{asset.percentage.toFixed(2)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NAME</TableHead>
                <TableHead className="text-right">% OF ASSETS</TableHead>
                <TableHead className="text-right">VALUE</TableHead>
                <TableHead className="text-right">CHANGE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.name}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{asset.name}</span>
                      <span className="text-xs text-muted-foreground">· {asset.items}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{asset.percentage.toFixed(2)}%</TableCell>
                  <TableCell className="text-right">${asset.value.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <span className={asset.change >= 0 ? "text-green-500" : "text-red-500"}>
                      {asset.change >= 0 ? "+" : ""}${Math.abs(asset.change).toLocaleString()} (
                      {asset.change >= 0 ? "+" : ""}
                      {asset.changePercentage}%)
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

