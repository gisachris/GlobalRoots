import { LandingPage } from "../../pages/LandingPage"
import { useAuth } from "../../utils/auth"

function LoggedIn() {

    const {isAuthenticated} = useAuth()

  return (
    <>
        {isAuthenticated? <h1>H1</h1>:<LandingPage/>}
    </>
  )
}

export default LoggedIn