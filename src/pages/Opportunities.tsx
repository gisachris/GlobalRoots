import { useAuth } from "../utils/auth"
import { useNavigate } from "react-router-dom"
import { YouthOpportunity } from "./YouthOpportunity"

export default function Opportunities() {

  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  if(isAuthenticated) {
    return <YouthOpportunity />
  }

   navigate('/auth')

}