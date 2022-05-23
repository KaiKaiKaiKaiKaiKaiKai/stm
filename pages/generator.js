import Link from 'next/link' 
import { useContext } from "react"
import { UserContext } from "../lib/context"
import { genItem } from "../lib/firebase"

function Generator() {
    const {user, username, souls, inventory} = useContext(UserContext)
    function submitGen() {
        genItem(user.uid)
    }
    return (
    <div>{user ?<div className={`h-[calc(100vh-3.5rem)] bg-zinc-700`}>
    <div className="px-8 h-full w-full max-w-6xl m-auto flex items-center justify-center">
    <form className="p-8 bg-zinc-800 w-96 rounded-md">
    <Link href="/"><div onClick={ submitGen } className={`rounded-md text-center font-semibold cursor-pointer bg-blue-400 text-zinc-800 text-base p-2`}>Generate Item</div></Link>
  </form>
    </div>
  </div>:null}</div>
  )
}

export default Generator