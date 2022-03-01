import { db, auth } from './firebase'
import { onSnapshot, doc, query, orderBy, collection, getDoc } from "firebase/firestore"; 
import { onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut} from 'firebase/auth'  
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Listing } from '../components/Listing'

/*export function useUserData() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);
    const [souls, setSouls] = useState(null);
    const [inventory, setInventory] = useState(null);
    let itemRefs;
    let itemRefs2 = doc(db, 'items', 'hK4cvswTYXSEzjAUYxND');

    useEffect(() => {
        let unsubscribe;
        
        if(user) {
            unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
                setUsername(doc.data()?.name);
                console.log(doc.data()?.name);
                setSouls(doc.data()?.souls);
                console.log(doc.data()?.souls);
                itemRefs = doc.data()?.inventory;
                console.log(doc.data())

                console.log(itemRefs)
                console.log(itemRefs2)
            });

            unsubscribe = onSnapshot(itemRefs2, (doc) => {
                //console.log(doc.data());
            });
        } else {
            setUsername(null);
        }

        return unsubscribe
    }, [user]);

    return {user, username, souls, inventory}
}*/


export function useUserData() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);
    const [souls, setSouls] = useState(null);
    const [inventory, setInventory] = useState(null);
    let itemRefs;
    let itemRefs2 = doc(db, 'items', 'hK4cvswTYXSEzjAUYxND');

    useEffect(() => {
        let unsubscribe;
        
        if(user) {
            unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
                setUsername(doc.data()?.name);
                console.log(doc.data()?.name);
                setSouls(doc.data()?.souls);
                console.log(doc.data()?.souls);
                itemRefs = doc.data()?.inventory;
                console.log(doc.data())

                console.log(itemRefs)
                console.log(itemRefs2)
            });

            unsubscribe = onSnapshot(itemRefs2, (doc) => {
                //console.log(doc.data());
            });
        } else {
            setUsername(null);
        }

        return unsubscribe
    }, [user]);

    return {user, username, souls, inventory}
}



export function useUsername() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        let unsubscribe;

        if(user) {
            unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
                setUsername(doc.data()?.name);
                console.log(doc.data()?.name);
            });
        } else {
            setUsername(null);
        }

        return unsubscribe
    }, [user]);

    return {user, username}
}

export function useSouls() {
    const [user] = useAuthState(auth);
    const [souls, setSouls] = useState(null);

    useEffect(() => {
        let unsubscribe;

        if(user) {
            unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
                setSouls(doc.data()?.souls);
                console.log(doc.data()?.souls);
            });
        } else {
            setSouls(null);
        }

        return unsubscribe
    }, [user]);

    return {user, souls}
}

export function useList({trans}) {
    
    let col

    trans == "wtb" ?
        col = "wtb"
    :   col = "wts"

    const [listings, setListings] = useState(null);

    useEffect(() => {
        let unsubscribe;

        const q = query(collection(db, col), orderBy("timestamp", "desc"))
        unsubscribe = onSnapshot(q, (snapshot) =>
        setListings(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))))

        return unsubscribe
    }, []);

    return {listings}
}

export const logout = async () => {
    await signOut(auth);
}

export const login = async (loginEmail, loginPassword) => {
    try {
        await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
        )
    }
    catch {

    }
}