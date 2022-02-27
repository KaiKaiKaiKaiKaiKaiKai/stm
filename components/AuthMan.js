import { auth } from '../firebase'
import { signOut} from 'firebase/auth'
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'


export function getAuthUser () {
    const [user, setUser] = useState({})

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })
    return user
}

export const logOut = async () => {
    await signOut(auth);
}