// Financebro/app/actions/auth.ts
"use server";

import { cookies } from "next/headers";
import { createUser, getUserByEmail, verifyPassword } from "@/lib/db";

export async function login(formData: FormData) {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            return { error: "Email and password are required" };
        }

        // Retrieve the user using the email address
        const user = await getUserByEmail(email);
        if (!user) {
            return { error: "Invalid credentials" };
        }

        // Verify the password using the hashed password stored in the DB
        const isValid = await verifyPassword(password, user.password_hash);
        if (!isValid) {
            return { error: "Invalid credentials" };
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
        return { error: "An error occurred during login" };
    }
}

export async function signup(formData: FormData) {
    try {
        const firstName = formData.get("firstName") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!firstName || !email || !password) {
            return { error: "All fields are required" };
        }

        // Check if the email is already registered
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return { error: "Email already exists" };
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

        return { success: true, user };
    } catch (error) {
        console.error("Signup error:", error);
        return { error: "An error occurred during signup" };
    }
}
