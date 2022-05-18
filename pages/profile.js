import { useContext } from "react"
import { UserContext } from "../lib/context"
import { logout } from "../lib/hooks"

function Profile() {
  const {user, username, souls, inventory} = useContext(UserContext)
  console.log(inventory);
  return (
    <div>{String(inventory)}</div>
  )
}

export default Profile