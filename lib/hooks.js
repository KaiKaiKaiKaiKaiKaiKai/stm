import { db, auth, getItemTypeData, getItemTierData } from './firebase'
import { onSnapshot, doc, query, orderBy, collection, getDoc } from "firebase/firestore"; 
import { onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut} from 'firebase/auth'  
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useContext } from "react"
import { UserContext } from "../lib/context"
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


    useEffect(() => {
        let unsubscribe;
        
        if(user) {
            unsubscribe = onSnapshot(doc(db, 'users', user.uid), async function fetchData(doc) {
                setUsername(doc.data()?.name);
                setSouls(doc.data()?.souls);
                setInventory(doc.data()?.inventory);
                //let itemdoc = await getItemData(doc.data()?.inventory.id);
            });
        } else {
            setUsername(null);
        }

        return unsubscribe
    }, [user]);

    return {user, username, souls, inventory}
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

export function useItem() {
    
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

export function useList({trans, userUid}) {

    const [user] = useAuthState(auth);
    
    let col

    trans == "wtb" ?
        col = 'users/' + String(user?.uid) + '/inventory'
    :   col = "wts"

    console.log(col)

    const [listings, setListings] = useState(null);

    useEffect(() => {
        let unsubscribe;

        const q = query(collection(db, col), orderBy("timestamp", "desc"))
        unsubscribe = onSnapshot(q, (snapshot) =>
        setListings(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))))

        return unsubscribe
    }, []);

    console.log(listings)
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