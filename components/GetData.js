import { useState } from 'react';
import { auth } from "../firebase"
import { onAuthStateChanged } from 'firebase/auth'

export function getAuthUser () {
    const [user, setUser] = useState({})

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })
    return user
}