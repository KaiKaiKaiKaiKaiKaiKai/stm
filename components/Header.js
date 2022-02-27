
import {
    ShoppingCartIcon,
    ChatAlt2Icon,
    LoginIcon,
    LogoutIcon,
} from "@heroicons/react/solid"
import HeaderItem from "./HeaderItem"
import Link from 'next/link'
import { getAuthUser, logOut } from '../components/AuthMan'
import GetUserName from '../components/GetUserName'
import GetUserSouls from '../components/GetUserSouls'

function Header() {
    const user = getAuthUser()

  return (
    <nav className="bg-zinc-800 h-14 w-full">
        <div className="px-8 h-full w-full max-w-6xl m-auto flex items-center justify-between">
            <div className="text-left">
                <Link href="/"><a><h1 className="text-white text-3xl font-thin">Soul<font className="text-blue-400 font-normal">Traders</font></h1></a></Link>
            </div>
            <div className="text-right">
                <HeaderItem title='Market' green='true' Icon={ShoppingCartIcon} href='/'/>
                <HeaderItem title='Support' Icon={ChatAlt2Icon} special='false' href='/support'/>
                <separator className="border-l border-zinc-400 ml-6"></separator>
                {user?.email
                ?   <span className="ml-6 text-zinc-400 text-sm">
                        <span><GetUserName email={user.email} /></span>
                        <span className="ml-3 text-purple-400"><GetUserSouls email={user.email} /> Souls</span>
                        <separator className="border-l border-zinc-400 ml-6"></separator>
                        <button onClick={logOut}><HeaderItem title='Sign out' Icon={LogoutIcon} special='false' href=""/></button>
                    </span>
                : <HeaderItem title='Sign in' Icon={LoginIcon} special='false' href='/signin'/>
                }
            </div>
        </div>
    </nav>
  )
}

export default Header