import Listing from './Listing'
import { useList } from '../lib/hooks'
import { Colors } from '../components/Color'

function List({trans}) {

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