import { db } from '../lib/firebase'
import { collection, query, where, onSnapshot} from "firebase/firestore"; 
import { useState, useEffect } from 'react';

function GetUserSouls({email}) {
    
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

export default GetUserSouls