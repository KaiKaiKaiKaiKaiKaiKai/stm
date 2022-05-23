
import {
    ShoppingCartIcon,
    ChatAlt2Icon,
    LoginIcon,
    LogoutIcon,
} from "@heroicons/react/solid"
import HeaderItem from "./HeaderItem"
import Link from 'next/link'
import { useContext } from "react"
import { UserContext } from "../lib/context"
import { logout } from "../lib/hooks"

function Header() {
    const {user, username, souls} = useContext(UserContext)

  return (
    <nav className="bg-zinc-800 h-14 w-full">
        <div className="px-8 h-full w-full max-w-6xl m-auto flex items-center justify-between">
            <div className="text-left">
                <Link href="/"><a><h1 className="text-white text-xl md:text-2xl font-thin">Soul<font className="text-blue-400 font-normal">Traders</font></h1></a></Link>
            </div>
            <div className="text-right">
                {user
                ?   <div>
                        <div className={`ml-6 inline-flex text-sm items-center text-zinc-400 align-middle`}>
                        <span>{username}</span>
                        <span className="ml-2 text-purple-400">{souls}</span>
                        </div>
                        <separator className="border-l border-zinc-400 ml-3"></separator>
                        <button onClick={logout}><HeaderItem title='Sign out' Icon={LogoutIcon} special='false' href=""/></button>
                    </div>
                : <HeaderItem title='Sign in' Icon={LoginIcon} special='false' href='/signin'/>
                }
            </div>
        </div>
    </nav>
  )
}

export default Header