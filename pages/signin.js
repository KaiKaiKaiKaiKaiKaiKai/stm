import { useState } from 'react'
import { auth } from '../lib/firebase'
import { logout, login } from '../lib/hooks'
import { onAuthStateChanged } from 'firebase/auth'

const SignIn = () => {
  
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const [user, setUser] = useState({})

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  function sendLogin() {
    login(loginEmail, loginPassword)
  }

  return (
    <div>
      signin
      <input placeholder="email" onChange={(e) => { setLoginEmail(e.target.value) }} />
      <input placeholder='password' onChange={(e) => { setLoginPassword(e.target.value) }}/>
      <button onClick={sendLogin}>login</button>
      <br/>
      <p>{user?.email ? 'yes' : 'no'}</p>
      <br />
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default SignIn