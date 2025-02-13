import { pool } from "@/lib/db";
import { cache } from "react";
import type { Account, AccountType, DashboardData } from "../types";

const ACCOUNT_TYPES: AccountType[] = ["cash", "investments", "crypto", "real_estate", "credit_cards"];

export const getDashboardData = cache(async (userId: string): Promise<DashboardData> => {
  // Récupérer tous les comptes de l'utilisateur avec leurs soldes et variations
  const accountsQuery = `
    SELECT
      a.id,
      a.user_id,
      a.account_name,
      a.account_type,
      a.bank_name,
      a.currency,
      a.current_balance,
      a.created_at,
      a.updated_at,
      COALESCE(
          ROUND(
              (
                SELECT (a.current_balance - b.balance) / NULLIF(b.balance, 0) * 100
                FROM balance_history b
                WHERE b.account_id = a.id
                  AND b.created_at >= NOW() - INTERVAL '24 hours'
                ORDER BY b.created_at ASC
                LIMIT 1
            )::numeric, 2
        ),
          0
      ) as change_24h
    FROM accounts a
    WHERE a.user_id = $1
    ORDER BY a.account_type, a.account_name;
  `;
  const accountsResult = await pool.query<Account>(accountsQuery, [userId]);

  // Calculer les totaux par catégorie
  const categoryTotalsQuery = `
    SELECT
      account_type as type,
      SUM(current_balance) as total,
      AVG(
          COALESCE(
              (
                SELECT (a.current_balance - b.balance) / NULLIF(b.balance, 0) * 100
                FROM balance_history b
                WHERE b.account_id = a.id
                  AND b.created_at >= NOW() - INTERVAL '24 hours'
              ORDER BY b.created_at ASC
              LIMIT 1
            ),
          0
        )
      ) as avg_change
    FROM accounts a
    WHERE a.user_id = $1
    GROUP BY account_type;
  `;
  const categoryTotalsResult = await pool.query(categoryTotalsQuery, [userId]);

  // Organiser les données par catégorie
  const accounts = accountsResult.rows;
  const categoryTotals = categoryTotalsResult.rows;

  const categories = ACCOUNT_TYPES.map((type) => {
    const categoryAccounts = accounts.filter((account) => account.account_type === type);
    const categoryTotal = categoryTotals.find((cat) => cat.type === type);

    return {
      type,
      total: categoryTotal?.total || 0,
      change: Number(categoryTotal?.avg_change.toFixed(2)) || 0,
      accounts: categoryAccounts,
      isExpanded: false,
    };
  });

  // Calculer les totaux globaux
  const totalAssets = categories
      .filter((cat) => cat.type !== "credit_cards")
      .reduce((sum, cat) => sum + cat.total, 0);
  const totalLiabilities = categories.find((cat) => cat.type === "credit_cards")?.total || 0;
  const totalNetWorth = totalAssets - totalLiabilities;

  return {
    categories,
    totalNetWorth,
    totalAssets,
    totalLiabilities,
  };
});
