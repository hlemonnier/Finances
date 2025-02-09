// Financebro/app/actions/user.ts
"use server";

import {pool} from "../../lib/db";

/**
 * Saves onboarding data for a user by updating their record.
 *
 * @param data An object containing onboarding data. Must include an "email" property.
 * @returns An object indicating success.
 * @throws Error if the email is missing or if the update fails.
 */
export async function saveOnboardingData(data: any) {
    if (!data.email) {
        throw new Error("User email not provided");
    }

    try {
        const queryText = `
            UPDATE users
            SET primary_financial_goal = $1,
                currency_preference    = $2,
                financial_region       = $3,
                theme_mode             = $4,
                language               = $5,
                onboarding_completed   = true
            WHERE email = $6
        `;
        const values = [
            data.financialGoal,
            data.currency,
            data.region,
            data.theme,
            data.language,
            data.email,
        ];

        await pool.query(queryText, values);
        return {success: true};
    } catch (error) {
        console.error("Error saving onboarding data:", error);
        throw new Error("Failed to save onboarding data");
    }
}

/**
 * Retrieves the email of a user based on their user ID.
 *
 * @param userId The ID of the user.
 * @returns A promise that resolves to the user's email.
 * @throws Error if no email is found or if the query fails.
 */
export async function getUserEmail(userId: string): Promise<string> {
    try {
        const queryText = `SELECT email
                           FROM users
                           WHERE id = $1`;
        const result = await pool.query(queryText, [userId]);
        const email = result.rows[0]?.email;
        if (!email) {
            throw new Error(`No email found for user ID: ${userId}`);
        }
        return email;
    } catch (error) {
        console.error("Error fetching user email:", error);
        throw new Error("Failed to fetch user email");
    }
}
