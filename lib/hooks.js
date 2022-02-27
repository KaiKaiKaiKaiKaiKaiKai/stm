import { db, auth } from './firebase'
import { onSnapshot, doc, query, orderBy, collection } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import { Listing } from '../components/Listing'

export function useUserData() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);
    const [souls, setSouls] = useState(null);

    useEffect(() => {
        let unsubscribe;

        if(user) {
            unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
                setUsername(doc.data()?.name);
                console.log(doc.data()?.name);
                setSouls(doc.data()?.souls);
                console.log(doc.data()?.souls);
            });
        } else {
            setUsername(null);
        }

        return unsubscribe
    }, [user]);

    return {user, username, souls}
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

export function useWts() {
    
    const [listings, setListings] = useState(null);

    useEffect(() => {
        let unsubscribe;

        const q = query(collection(db, "wts"), orderBy("timestamp", "desc"))
        unsubscribe = onSnapshot(q, (snapshot) =>
        setListings(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))))

        return unsubscribe
    }, []);

    return {listings}
}

export function useWtb() {
    
    const [listings, setListings] = useState(null);

    useEffect(() => {
        let unsubscribe;

        const q = query(collection(db, "wtb"), orderBy("timestamp", "desc"))
        unsubscribe = onSnapshot(q, (snapshot) =>
        setListings(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))))

        return unsubscribe
    }, []);

    return {listings}
}