import { useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut} from 'firebase/auth'

function signin() {
  
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const [user, setUser] = useState({})

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })
  
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      )
    }
    catch {

    }
  }

  const logout = async () => {
    await signOut(auth);
  }

  return (
    <div>
      signin
      <input placeholder="email" onChange={(e) => { setLoginEmail(e.target.value) }} />
      <input placeholder='password' onChange={(e) => { setLoginPassword(e.target.value) }}/>
      <button onClick={login}>login</button>
      <br/>
      <p>{user?.email ? 'yes' : 'no'}</p>
      <br />
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default signin