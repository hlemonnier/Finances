export type AccountType = "cash" | "investments" | "crypto" | "real_estate" | "credit_cards"

export interface Account {
  id: number
  user_id: number
  account_name: string
  account_type: AccountType
  bank_name: string
  currency: string
  current_balance: number
  created_at: Date
  updated_at: Date
  change_24h: number
}

export interface AccountCategory {
  type: AccountType
  total: number
  change: number
  accounts: Account[]
  isExpanded: boolean
}

export interface DashboardData {
  categories: AccountCategory[]
  totalNetWorth: number
  totalAssets: number
  totalLiabilities: number
}

