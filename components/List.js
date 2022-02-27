import Listing from './Listing'
import { useWts } from '../lib/hooks'
import { useWtb } from '../lib/hooks'
import { Colors } from '../components/Color'

function List({trans}) {

    let listingsObj
    trans == "wts" ?
        listingsObj = useWts()
    :   listingsObj = useWtb()
  
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