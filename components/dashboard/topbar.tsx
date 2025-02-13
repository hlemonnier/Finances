"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useSidebar } from "@/components/ui/sidebar"

export function Topbar() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const { state } = useSidebar()

  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean)
    if (paths.length === 0) return [<BreadcrumbPage key="dashboard">Dashboard</BreadcrumbPage>]

    return paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`
      const isLast = index === paths.length - 1
      const label = path.charAt(0).toUpperCase() + path.slice(1)

      if (isLast) {
        return (
            <BreadcrumbItem key={path}>
              <BreadcrumbPage>{label}</BreadcrumbPage>
            </BreadcrumbItem>
        )
      }

      return (
          <BreadcrumbItem key={path}>
            <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
      )
    })
  }

  return (
      <header
          className={`sticky top-0 z-50 w-full border-b bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/5 ${
              state === "expanded" ? "left-64" : "left-16"
          } right-0 transition-all duration-300`}
      >
        <div className="flex h-14 items-center justify-between px-4 bg-white/10 rounded-lg m-2">
          <div className="flex items-center gap-4">
            <Breadcrumb>
              <BreadcrumbList>{generateBreadcrumbs()}</BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex-1 flex justify-end mr-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 flex-shrink-0"
              />
            </div>
          </div>
        </div>
      </header>
  )
}

