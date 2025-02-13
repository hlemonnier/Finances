import { pool } from "@/lib/db";
import { cache } from "react";

export const getUserPreferences = cache(async (userId: string) => {
  const query = `
    SELECT theme_mode, language, currency_preference
    FROM users
    WHERE id = $1
  `;
  const result = await pool.query(query, [userId]);
  return result.rows[0];
});
