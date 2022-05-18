import Listing from './Listing'
import { useList } from '../lib/hooks'
import { Colors } from '../components/Color'
import { useContext } from "react"
import { UserContext } from "../lib/context"

function List({trans}) {

    const {user, username, souls} = useContext(UserContext)

    const listingsObj = useList({trans})
  
    return (
        <div>
            {
               listingsObj.listings ?
                    listingsObj.listings.map((listing) => {
                        return (
                            <Listing key={listing.id} itemID={listing.item.id} lister={listing.lister} price={listing.price} href="/" trans={trans}/>
                        )
                    })

                : null
            }
        </div>
    )
}

export default List