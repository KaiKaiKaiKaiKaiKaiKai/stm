import { db, auth } from './firebase'
import { collection, query, where, onSnapshot, doc} from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';


export function useUserSouls() {
    const [user] = useAuthState(auth)
    const [listings, setListings]=useState([])
    
    const fetchListings = async () => {

        const q = query(collection(db, "users"), where("email", "==", email));
        onSnapshot(q, (snapshot) =>
        setListings(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        
        )
    }
    
    useEffect(() => {
        fetchListings();
      }, [])
  
    return (
    <a>
        {
            listings.map((listing) => {
                return (
                    `${String(listing.souls)}`
                )
            })
        }
    </a>
  )
}

// export function useUserName() {
    
//     const [listings, setListings]=useState([])
    
//     const fetchListings = async () => {

//         const q = query(collection(db, "users"), where("email", "==", email));
//         onSnapshot(q, (snapshot) =>
//         setListings(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        
//         )
//     }
    
//     useEffect(() => {
//         fetchListings();
//       }, [])
  
//     return (
//     <a>
//         {
//             listings.map((listing) => {
//                 return (
//                     `${String(listing.name)}`
//                 )
//             })
//         }
//     </a>
//   )
// }

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