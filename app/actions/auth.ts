// Financebro/app/actions/auth.ts
"use server";

import {cookies} from "next/headers";
import { createUser, getUserByEmail, verifyPassword, updateUserPassword,pool } from "@/lib/db"
import {v4 as uuidv4} from "uuid";
import bcrypt from "bcryptjs";

export async function login(formData: FormData) {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            return {error: "Email and password are required"};
        }

        // Retrieve the user using the email address
        const user = await getUserByEmail(email);
        if (!user) {
            return {error: "Invalid credentials"};
        }

        // Verify the password using the hashed password stored in the DB
        const isValid = await verifyPassword(password, user.password_hash);
        if (!isValid) {
            return {error: "Invalid credentials"};
        }

        // Set a session cookie with the user ID
        cookies().set("user_id", user.id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                onboardingCompleted: user.onboarding_completed,
            },
            redirectTo: user.onboarding_completed ? "/dashboard" : "/onboarding",
        };
    } catch (error) {
        console.error("Login error:", error);
        return {error: "An error occurred during login"};
    }
}

export async function signup(formData: FormData) {
    try {
        const firstName = formData.get("firstName") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!firstName || !email || !password) {
            return {error: "All fields are required"};
        }

        // Check if the email is already registered
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return {error: "Email already exists"};
        }

        // Create the new user
        const user = await createUser(firstName, email, password);

        // Set a session cookie with the new user's ID
        cookies().set("user_id", user.id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 1 week
        });

        return {success: true, user};
    } catch (error) {
        console.error("Signup error:", error);
        return {error: "An error occurred during signup"};
    }
}

export async function requestPasswordReset(email: string) {
    try {
        // Check if the user exists
        const user = await getUserByEmail(email);
        if (!user) {
            return {error: "User not found"};
        }

        // Generate a unique reset token
        const resetToken = uuidv4();
        const expiresAt = new Date(Date.now() + 3600000); // Token expires in 1 hour

        // Store the reset token in the database using the pg pool
        await pool.query(
            "INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)",
            [user.id, resetToken, expiresAt]
        );

        // TODO: Send an email with the reset link
        // For now, log the reset link for debugging purposes.
        console.log(`Password reset link: http://localhost:3000/reset-password?token=${resetToken}`);

        return {success: true};
    } catch (error) {
        console.error("Password reset request error:", error);
        return {error: "An error occurred while processing your request"};
    }
}

export async function resetPassword(token: string, newPassword: string) {
    try {
        const result = await pool.query(
            "SELECT user_id FROM password_reset_tokens WHERE token = $1 AND expires_at > NOW()",
            [token]
        );

        if (result.rows.length === 0) {
            return { error: "Invalid or expired reset token" };
        }

        const userId = result.rows[0].user_id;
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        await updateUserPassword(userId, hashedPassword);

        // Delete the used reset token
        await pool.query("DELETE FROM password_reset_tokens WHERE token = $1", [token]);

        return { success: true };
    } catch (error) {
        console.error("Password reset error:", error);
        return { error: "An unexpected error occurred. Please try again." };
    }
}
