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
                            <Listing key={listing.id} title={listing.title} quantity={listing.quantity} price={listing.price} href="/" tier={listing.tier} trans={trans} borderColor={Colors[listing.tier]}/>
                        )
                    })

                : null
            }
        </div>
    )
}

export default List