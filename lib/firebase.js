import { initializeApp, getApp, getApps, } from 'firebase/app';
import { getFirestore, doc, getDoc, addDoc, collection, Timestamp, deleteDoc, updateDoc, increment, getDocs} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Follow this pattern to import other Firebase services.
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
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

export async function deleteItem(userUid, listingId, itemId) {
    removeItemFromInv(userUid, listingId)
    removeItemFromItems(itemId)
}

export async function buyItem(userUid, listingId, itemId, price, listerId) {
    addItemToInv(userUid, itemId)
    updateUserSouls(userUid, price)
    updateListerSouls(listerId, price)
    removeItemFromMarket(listingId)
}

export async function sellItem(userUid, listingId, itemId, price, username) {
    addItemToMarket(itemId, price, userUid)
    removeItemFromInv(userUid, listingId)
}

export async function updateUserSouls(userUid, price) { 
    await updateDoc(doc(db, 'users', userUid), {
        souls: increment(-price)
    })
}

export async function updateListerSouls(listerId, price) { 
    await updateDoc(doc(db, 'users', listerId), {
        souls: increment(price)
    })
}

export async function addItemToInv(userUid, itemId) { 
    await addDoc(collection(db, 'users/' + userUid + "/inventory"), {
        item: doc(db, 'items/' + itemId),
        timestamp: Timestamp.now()
    })
}

export async function removeItemFromInv(userUid, listingId) { 
    await deleteDoc(doc(db, 'users/' + userUid + "/inventory", listingId))
}

export async function removeItemFromItems(itemId) { 
    await deleteDoc(doc(db, 'items/' + itemId))
}

export async function removeItemFromMarket(listingId) { 
    await deleteDoc(doc(db, 'mkt', listingId))
}

export async function addItemToMarket(itemId, price, userUid) { 
    await addDoc(collection(db, 'mkt'), {
        item: doc(db, 'items/' + itemId),
        lister: doc(db, 'users/' + userUid),
        price: price,
        timestamp: Timestamp.now()
    })
}

export async function updateItemNickname(itemId, nickname) { 
    await updateDoc(doc(db, 'items', itemId), {
        nickname: nickname
    })
}

export async function updatePrice(listingId, price) { 
    await updateDoc(doc(db, 'mkt', listingId), {
        price: price
    })
}

export async function newItem(tierId, typeId, nickname, userUid) {
    await addDoc(collection(db, 'items'), {
        nickname: nickname,
        tier: doc(db, 'tiers/' + tierId),
        type: doc(db, 'types/' + typeId)
    })
    .then(function(docRef){
        addItemToInv(userUid, docRef.id)
    })
}

export async function genItem(userUid) {
    const typeSnap = await getDocs(collection(db, 'types'))
    const tierSnap = await getDocs(collection(db, 'tiers'))
    const typeDocs = typeSnap.docs.map(doc => doc.id)
    const tierDocs = tierSnap.docs.map(doc => doc.id)
    const randomTierDocId = tierDocs[Math.floor(Math.random() * tierDocs.length)]
    const randomTypeDocId = typeDocs[Math.floor(Math.random() * typeDocs.length)]
    const nickname = "new"
    newItem(randomTierDocId, randomTypeDocId, nickname, userUid)
}

export default app;