"use server"

import { cookies } from "next/headers"
import { createClient } from "@vercel/postgres"
import { createUser, getUserByEmail, verifyPassword, updateUserPassword } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"
import { setUserSession, clearUserSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function login(formData: FormData) {
    try {
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        if (!email || !password) {
            return { error: "Please provide both email and password" }
        }

        const user = await getUserByEmail(email)
        if (!user || !(await verifyPassword(password, user.password_hash))) {
            return { error: "Invalid email or password" }
        }

        // Set the session
        await setUserSession(user.id.toString())

        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                onboardingCompleted: user.onboarding_completed,
            },
            redirectTo: user.onboarding_completed ? "/dashboard" : "/onboarding",
        }
    } catch (error) {
        console.error("Login error:", error)
        return { error: "An unexpected error occurred. Please try again." }
    }
}

export async function signup(formData: FormData) {
    try {
        const firstName = formData.get("firstName") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        if (!firstName || !email || !password) {
            return { error: "Please fill in all required fields" }
        }

        const existingUser = await getUserByEmail(email)
        if (existingUser) {
            return { error: "An account with this email already exists" }
        }

        const user = await createUser(firstName, email, password)

        // Set a session cookie
        cookies().set("user_id", user.id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 1 week
        })

        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                onboardingCompleted: false,
            },
            redirectTo: "/onboarding",
        }
    } catch (error) {
        console.error("Signup error:", error)
        return { error: "An unexpected error occurred. Please try again." }
    }
}

export async function requestPasswordReset(email: string) {
    const client = createClient()
    try {
        await client.connect()

        const user = await getUserByEmail(email)
        if (!user) {
            return { error: "No account found with this email address" }
        }

        const resetToken = uuidv4()
        const expiresAt = new Date(Date.now() + 3600000) // Token expires in 1 hour

        await client.query("INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)", [
            user.id,
            resetToken,
            expiresAt,
        ])

        // TODO: Send an email with the reset link
        console.log(`Password reset link: http://localhost:3000/reset-password?token=${resetToken}`)

        return { success: true }
    } catch (error) {
        console.error("Password reset request error:", error)
        return { error: "An unexpected error occurred. Please try again." }
    } finally {
        await client.end()
    }
}

export async function resetPassword(token: string, newPassword: string) {
    const client = createClient()
    try {
        await client.connect()

        const result = await client.query(
            "SELECT user_id FROM password_reset_tokens WHERE token = $1 AND expires_at > NOW()",
            [token],
        )

        if (result.rows.length === 0) {
            return { error: "Invalid or expired reset token" }
        }

        const userId = result.rows[0].user_id
        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await updateUserPassword(userId, hashedPassword)

        await client.query("DELETE FROM password_reset_tokens WHERE token = $1", [token])

        return { success: true }
    } catch (error) {
        console.error("Password reset error:", error)
        return { error: "An unexpected error occurred. Please try again." }
    } finally {
        await client.end()
    }
}

export async function logout() {
    await clearUserSession()
    redirect("/login")
}

