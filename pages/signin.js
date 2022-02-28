import { useState } from 'react'
import { auth } from '../lib/firebase'
import { login } from '../lib/hooks'
import { onAuthStateChanged } from 'firebase/auth'
import Link from 'next/link'

const SignIn = () => {
  
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const [user, setUser] = useState({})

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  function sendLogin() {
    login(loginEmail, loginPassword)
    setLoginEmail("")
    setLoginPassword("")
  }

  return (
    <div className={`h-[calc(100vh-3.5rem)] bg-zinc-700`}>
      <div className="px-8 h-full w-full max-w-6xl m-auto flex items-center justify-center">
      <form className="p-8 bg-zinc-800 w-96 rounded-md">
      <input placeholder="Email" type="email" onChange={(e) => { setLoginEmail(e.target.value) }} value={loginEmail} className="rounded-md mb-4 bg-zinc-900 p-2 text-white w-full outline-0"/>
      <br />
      <input placeholder="Password" type="password" onChange={(e) => { setLoginPassword(e.target.value) }} value={loginPassword} className="rounded-md mb-4 bg-zinc-900 p-2 text-white w-full outline-0"/>
      <br />
      <Link href="/"><div onClick={ sendLogin } className={`rounded-md text-center font-semibold cursor-pointer bg-blue-400 text-zinc-800 text-base p-2`}>Login</div></Link>
    </form>
      </div>
    </div>
  )
}

export default SignIn