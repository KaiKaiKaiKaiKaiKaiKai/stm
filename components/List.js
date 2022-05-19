import Listing from './Listing'
import { useList } from '../lib/hooks'
import { useContext } from "react"
import { UserContext } from "../lib/context"

function List({trans}) {

    const {user} = useContext(UserContext)

    const listingsObj = useList({trans})
  
    return (
        <div>
            {
               listingsObj.listings ?
                    listingsObj.listings.map((listing) => {
                        return (
                            <Listing key={listing.id} listingId={listing.id} itemID={listing.item.id} listerID={trans == 'mkt'? listing.lister.id : user.uid} price={listing.price} href="/" trans={trans}/>
                        )
                    })

                : null
            }
        </div>
    )
}

export default List