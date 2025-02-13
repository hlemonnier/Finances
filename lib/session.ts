import type { SessionOptions } from "iron-session"
import { cookies } from "next/headers"
import { getIronSession } from "iron-session"

export interface SessionData {
    userId: string
    isLoggedIn: boolean
}

// This is where we specify the typings of req.session.*
declare module "iron-session" {
    interface SessionData {
        userId: string
        isLoggedIn: boolean
    }
}

export const sessionOptions: SessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: "finance-bro-session",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
}

export async function getSession() {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions)
    return session
}

