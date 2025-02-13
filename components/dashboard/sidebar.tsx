"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useDashboard } from "./use-dashboard"
import { MiniTrend } from "./mini-trend"
import type { DashboardData } from "@/lib/types"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LayoutGrid,
  CreditCard,
  Building2,
  Plus,
  ChevronRight,
  HelpCircle,
  User,
  Settings,
  Bell,
  Briefcase,
} from "lucide-react"

interface SidebarProps {
  initialData: DashboardData
}

export function Sidebar({ initialData }: SidebarProps) {
  const pathname = usePathname()
  const { data, toggleCategory } = useDashboard(initialData)
  const [frequency, setFrequency] = useState("1M")

  // Mock trend data (replace with real data)
  const mockTrendData = [1, 2, 1.5, 3, 2, 4, 3.5]

  return (
      <SidebarComponent variant="sidebar" collapsible="icon" className="border-r bg-gray-100/80">
        <SidebarContent className="flex flex-col gap-6 p-4">
          <SidebarMenu className="gap-2">
            <SidebarMenuItem>
              <SidebarMenuButton
                  asChild
                  className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
              >
                <Link
                    href="/dashboard"
                    className={cn(
                        "flex h-10 items-center gap-3 rounded-lg px-4 text-[15px] font-medium hover:bg-gray-300",
                        pathname === "/dashboard" && "bg-gray-300",
                    )}
                >
                  <LayoutGrid className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                  asChild
                  className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
              >
                <Link
                    href="/accounts"
                    className="flex h-10 items-center gap-3 rounded-lg px-4 text-[15px] font-medium hover:bg-gray-300"
                >
                  <Building2 className="h-5 w-5" />
                  <span>Accounts</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                  asChild
                  className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
              >
                <Link
                    href="/transactions"
                    className="flex h-10 items-center gap-3 rounded-lg px-4 text-[15px] font-medium hover:bg-gray-300"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Transactions</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <SidebarGroup>
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground group-data-[collapsible=icon]:hidden">
                  PORTFOLIO
                </SidebarGroupLabel>
                <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center w-full">
                  <Briefcase className="h-5 w-5" />
                </div>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger className="h-auto border-0 bg-transparent p-0 text-xs font-semibold text-muted-foreground hover:bg-transparent [&>svg]:h-3 [&>svg]:w-3 group-data-[collapsible=icon]:hidden">
                    <SelectValue placeholder={frequency} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1W">1W</SelectItem>
                    <SelectItem value="1M">1M</SelectItem>
                    <SelectItem value="3M">3M</SelectItem>
                    <SelectItem value="1Y">1Y</SelectItem>
                    <SelectItem value="ALL">ALL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <button className="rounded-lg p-2 hover:bg-gray-300 group-data-[collapsible=icon]:mx-auto">
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <SidebarGroupContent className="mt-2">
              <SidebarMenu className="gap-1">
                <SidebarMenuItem>
                  <SidebarMenuButton
                      asChild
                      className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                  >
                    <Link
                        href="/new-account"
                        className="flex h-10 items-center gap-3 rounded-lg px-4 text-[15px] font-medium text-muted-foreground hover:bg-gray-300"
                    >
                      <Plus className="h-5 w-5" />
                      <span>New account</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {data?.categories
                    ?.filter((category) => category.accounts.length > 0)
                    .map((category) => (
                        <div key={category.type} className="space-y-1">
                          <SidebarMenuItem>
                            <button
                                onClick={() => toggleCategory(category.type)}
                                className="flex w-full items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-300 group-data-[collapsible=icon]:justify-center"
                            >
                              <div className="flex items-center gap-3">
                                <ChevronRight
                                    className={cn("h-4 w-4 transition-transform", category.isExpanded && "rotate-90")}
                                />
                                <span className="text-[15px] font-medium capitalize group-data-[collapsible=icon]:hidden">
                            {category.type.replace("_", " ")}
                          </span>
                              </div>
                              <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
                                <MiniTrend data={mockTrendData} color={category.change >= 0 ? "#16a34a" : "#dc2626"} />
                                <div className="text-right">
                                  <div className="text-[15px] font-medium">${category.total.toLocaleString()}</div>
                                  <div className={cn("text-xs", category.change > 0 ? "text-green-500" : "text-red-500")}>
                                    {category.change > 0 ? "+" : ""}
                                    {category.change}%
                                  </div>
                                </div>
                              </div>
                            </button>
                          </SidebarMenuItem>

                          {category.isExpanded && (
                              <div className="space-y-1 pl-11 group-data-[collapsible=icon]:hidden">
                                {category.accounts.map((account) => (
                                    <div
                                        key={account.id}
                                        className="flex items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-300"
                                    >
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium">
                                            {account.bank_name?.[0] || "C"}
                                          </div>
                                          <div className="text-[15px] font-medium">{account.account_name}</div>
                                        </div>
                                        {account.bank_name && (
                                            <div className="pl-8 text-sm text-muted-foreground">
                                              {`${account.bank_name} ··· ${account.account_name.slice(-4)}`}
                                            </div>
                                        )}
                                      </div>
                                      <div className="text-right">
                                        <div className="text-[15px]">
                                          {account.currency} {account.current_balance.toLocaleString()}
                                        </div>
                                        {account.change_24h !== 0 && (
                                            <div
                                                className={cn("text-xs", account.change_24h > 0 ? "text-green-500" : "text-red-500")}
                                            >
                                              {account.change_24h > 0 ? "+" : ""}
                                              {account.change_24h}%
                                            </div>
                                        )}
                                      </div>
                                    </div>
                                ))}
                                <button className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-[15px] font-medium text-muted-foreground hover:bg-gray-300">
                                  <Plus className="h-4 w-4" />
                                  New {category.type.replace("_", " ")} account
                                </button>
                              </div>
                          )}
                        </div>
                    ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t border-gray-300 p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                  asChild
                  className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
              >
                <Link href="/help" className="flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-gray-300">
                  <HelpCircle className="h-5 w-5" />
                  <span>Help</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                  asChild
                  className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
              >
                <Link href="/profile" className="flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-gray-300">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                  asChild
                  className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
              >
                <Link href="/settings" className="flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-gray-300">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                  asChild
                  className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
              >
                <Link href="/notifications" className="flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-gray-300">
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarTrigger className="absolute bottom-4 right-0 transform translate-x-1/2" />
      </SidebarComponent>
  )
}

