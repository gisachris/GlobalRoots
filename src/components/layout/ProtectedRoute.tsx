import { LandingPage } from "../../pages/LandingPage"
import { useAuth } from "../../utils/auth"

function ProtectedRouted() {

    const {isAuthenticated} = useAuth()

  return (
    <>
        {isAuthenticated? <h1>H1</h1>:<LandingPage/>}
    </>
  )
}

export default ProtectedRouted