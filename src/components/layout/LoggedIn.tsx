import { LandingPage } from "../../pages/LandingPage"
import { YouthHomePage } from "../../pages/YouthHomePage"
import { useAuth } from "../../utils/auth"

function LoggedIn() {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <LandingPage />
  }

  // Route based on user role
  if (user?.role === 'youth') {
    return <YouthHomePage />
  }

  // Default fallback for other roles
  return <YouthHomePage />
}

export default LoggedIn