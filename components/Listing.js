import Link from 'next/link'
import Image from 'next/image'
import { useItemData } from '../lib/hooks'
import { addItemToInv, addItemToMarket, buyItem, sellItem } from '../lib/firebase'
import { transColor} from './Color'
import { useContext } from "react"
import { UserContext } from "../lib/context"
import {
    ShoppingCartIcon,
} from "@heroicons/react/solid"

function Listing({Icon, itemID, href, price, trans, lister, listingId}) {

    const {user, username, souls} = useContext(UserContext)

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    function isInt(value) {
        return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
      }

    function submitForm() {
        if(trans == 'wts') {
            if(souls >= price) {
                buyItem(user.uid, listingId, itemID, price)
            } else {
                window.alert("You don't have enough Souls to buy this item!");
            }
        } else {
            price = prompt("Please enter a price");
            if(price != null) {
                if(isInt(price)) {
                    sellItem(user.uid, listingId, itemID, price, username)
                } else {
                    window.alert("Data type invalid!");
                }
            }
        }
    }
    
    const itemObj = useItemData(itemID);

    return (
        <div className={`rounded-md border-l-4 bg-zinc-800 w-full px-4 shadow-lg mb-4`} style={{borderColor:itemObj.itemTier?itemObj.itemTier.color:null}}>
            <div>
            <div className="h-full w-full flex items-center justify-between border-b border-zinc-400 py-2">
                <div className="mr-4 text-center">
                    <Link href={href}>
                        <a>
                            <Image src="/images/items/spear.png" height="40" width="40" alt="icon" className="rounded-full" />
                        </a>
                    </Link>
                </div>
                <table className="grow">
                    <tbody>
                    <tr>
                        <td className="w-3/6 leading-3">
                            <Link href={href}>
                                <a>
                                    <span className={`text-lg text-blue-400 underline`}>{itemObj.item?capitalize(itemObj.item.nickname):null} {itemObj.itemType?capitalize(itemObj.itemType.name):null}</span>
                                </a>
                            </Link>
                        </td>
                        <td className="w-3/6 leading-3">
                            
                        </td>
                    </tr>
                    <tr>
                        <td  className="w-3/6 leading-3">
                            <span className="text-zinc-400 text-sm mr-2 leading-3">
                            {trans == 'wts'? 'Listed by ' + lister : 'Owned'}
                            </span>
                        </td>
                        <td className="w-3/6 leading-3">
                            
                        </td>
                    </tr>
                    <tr>
                        <td className="w-3/6 leading-3">
                            <span className={`text-sm`} style={{color:transColor(trans)}}>
                                {trans == 'wts'? price + ' Souls' : 'TBD Souls'}
                            </span>
                        </td>
                        <td className="w-3/6 leading-3">
                            {user?<div onClick={ submitForm } className={`cursor-pointer float-right text-sm text-zinc-800 font-semibold bg-blue-400 rounded-sm px-1.5 py-0.5 text-center inline-flex items-center`}>
                                <ShoppingCartIcon className="h-4 mr-1" />
                                <span> {trans == "wts" ? 'Buy' : 'Sell'}</span>
                            </div>
                            :null}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="py-2">
                    <span className={`text-sm font-semibold py-0 px-1 text-center text-zinc-800 mr-1 rounded-sm`} style={{backgroundColor:transColor(trans)}}>
                        {trans}
                    </span>
                    <span className={`text-sm font-semibold py-0 px-1 text-center text-zinc-800 mr-1 rounded-sm `} style={{backgroundColor:itemObj.itemTier?itemObj.itemTier.color:null}}>
                        {itemObj.itemTier?itemObj.itemTier.name:null}
                    </span>
            </div>
            </div>
        </div>
    )
}

export default Listing