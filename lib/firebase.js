import { initializeApp, getApp, getApps, } from 'firebase/app';
import { getFirestore, QueryDocumentSnapshot, doc, getDoc, addDoc, collection} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useContext } from "react"
import { UserContext } from "../lib/context"

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration

const firebaseConfig = {
    apiKey: "AIzaSyDs_KZHkEsQs0V54mT-ZMv8b_RLUzM2jnk",
    authDomain: "soul-traders.firebaseapp.com",
    projectId: "soul-traders",
    storageBucket: "soul-traders.appspot.com",
    messagingSenderId: "689336324218",
    appId: "1:689336324218:web:88f4f3fddd480e7fb12bc3",
    measurementId: "G-V1PG6MQ7HG"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);



export async function getItemTierData(id) {
    const itemDocRef = doc(db, 'tiers', id);
    const itemSnap = await getDoc(itemDocRef);
    if(itemSnap.exists())
    {
        return(itemSnap.data())
    }
    else
    {
        return("Tier does not exist")
    }
}

export async function getItemTypeData(id) {
    const itemDocRef = doc(db, 'types', id);
    const itemSnap = await getDoc(itemDocRef);
    if(itemSnap.exists())
    {
        return(itemSnap.data())
    }
    else
    {
        return("Type does not exist")
    }
}

export async function buyItem(id) {
    const itemDocRef = doc(db, 'items', id);
    const itemSnap = await getDoc(itemDocRef);
    if(itemSnap.exists())
    {
        return(itemSnap.data())
    }
    else
    {
        return("Item does not exist")
    }
}

export async function addItemToInv(userUid, itemId) { 
    await addDoc(collection(db, 'users/' + userUid + "/inventory"), {
        item: doc(db, 'items/' + itemId),
    })
}

export default app;