import Listing from './Listing'
import { db } from '../lib/firebase'
import { collection, query, orderBy, onSnapshot} from "firebase/firestore"; 
import { useState, useEffect } from 'react';

function List({ trans }) {
    
    const [listings, setListings]=useState([])
    
    const fetchListings = async () => {

        const q = query(collection(db, trans), orderBy("timestamp", "desc"));
        onSnapshot(q, (snapshot) =>
        setListings(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        
        )
    }
    
    useEffect(() => {
        fetchListings();
      }, [])
  
    return (
    <div>
        {
            listings.map((listing) => {
                return (
                    <Listing key={listing.id} title={listing.title} quantity={listing.quantity} price={listing.price} href="/" tier={listing.tier} trans={trans}/>
                )
            })
        }
    </div>
  )
}

export default List