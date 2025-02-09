import { cookies } from "next/headers"
import { getUserEmail } from "@/app/actions/user"
import { OnboardingWrapper } from "@/components/onboarding-wrapper"

export default async function OnboardingPage() {
  const userId = cookies().get("user_id")?.value
  let userEmail = ""

  if (userId) {
    try {
      userEmail = await getUserEmail(userId)
      if (!userEmail) {
        console.error("User email not found for userId:", userId)
      }
    } catch (error) {
      console.error("Failed to fetch user email:", error)
    }
  } else {
    console.error("User ID not found in cookies")
  }

  return <OnboardingWrapper userEmail={userEmail} />
}

