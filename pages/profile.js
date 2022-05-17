import { useContext } from "react"
import { UserContext } from "../lib/context"
import { logout } from "../lib/hooks"

function Profile() {
  const {user, username, souls, inventory} = useContext(UserContext)
  return (
    <div><a>{inventory}</a></div>
  )
}

export default Profile