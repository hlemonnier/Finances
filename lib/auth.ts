import { redirect } from "next/navigation"
import { getSession } from "./session"

export async function getUserId() {
  const session = await getSession()
  if (!session.isLoggedIn) {
    redirect("/login")
  }
  return session.userId
}

export async function setUserSession(userId: string) {
  const session = await getSession()
  session.userId = userId
  session.isLoggedIn = true
  await session.save()
}

export async function clearUserSession() {
  const session = await getSession()
  session.destroy()
}

