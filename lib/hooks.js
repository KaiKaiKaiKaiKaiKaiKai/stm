import { db, auth, getItemTypeData, getItemTierData, getUser, getItemData } from './firebase'
import { onSnapshot, doc, query, orderBy, collection, getDoc } from "firebase/firestore"; 
import { signInWithEmailAndPassword, signOut} from 'firebase/auth'  
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';


export function useUserData() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);
    const [souls, setSouls] = useState(null);


    useEffect(() => {
        let unsubscribe;
        
        if(user) {
            unsubscribe = onSnapshot(doc(db, 'users', user.uid), async function fetchData(doc) {
                setUsername(doc.data()?.name);
                setSouls(doc.data()?.souls);
            });
        } else {
            setUsername(null);
        }

        return unsubscribe
    }, [user]);

    return {user, username, souls}
}

export function useListerData(id) {
    const [lister, setLister] = useState(null);


    useEffect(() => {
        let unsubscribe;
        
        unsubscribe = onSnapshot(doc(db, 'users', id), async function fetchData(doc) {
            setLister(doc.data()?doc.data():null);
        });

        return unsubscribe
    }, []);

    return {lister}
}

export function useItemData(id) {
    const [item, setItem] = useState(null);
    const [itemType, setItemType] = useState(null);
    const [itemTier, setItemTier] = useState(null);


    useEffect(() => {
        let unsubscribe;
        
        unsubscribe = onSnapshot(doc(db, 'items', id), async function fetchData(doc) {
            setItem(doc.data());
            setItemTier(await getItemTierData(doc.data()?.tier.id))
            setItemType(await getItemTypeData(doc.data()?.type.id))
            /*console.log(doc.data());
            console.log(await getItemData(doc.data()?.tier.id))*/
        });

        return unsubscribe
    }, []);


    return {item, itemType, itemTier}
}

export function useList({trans}) {

    const [user] = useAuthState(auth);
    
    let col

    const [listings, setListings] = useState(null);
    const oldListings = {}

    useEffect(() => {
        let unsubscribe;

        trans == "inv" ?
        col = 'users/' + user?.uid + '/inventory'
    :   col = "mkt"

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