import { useItemData, useListerData } from '../lib/hooks'
import { buyItem, sellItem, updateItemNickname, updatePrice, deleteItem } from '../lib/firebase'
import { transColor} from './Color'
import { useContext } from "react"
import { UserContext } from "../lib/context"
import {
    PencilIcon,
    ShoppingCartIcon,
    TrashIcon
} from "@heroicons/react/solid"

function Listing({itemId, price, trans, listerId, listingId, timestamp}) {

    const {user, username, souls} = useContext(UserContext)

    const date = new Date(timestamp.seconds * 1000)

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }

    function isInt(value) {
        return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
      }

    function submitTrans() {
        if(trans == 'mkt') {
            if(listerId == user.uid)
            {
                buyItem(user.uid, listingId, itemId, price, listerId)
            } else if(souls >= price) {
                if(confirm("Are you sure you want to buy " + capitalize(itemObj.itemTier?.name) + " " + capitalize(itemObj.itemType?.name) + " for " + price + " Souls?")) {
                    buyItem(user.uid, listingId, itemId, price, listerId)
                }
            } else {
                window.alert("You don't have enough Souls to buy this item!");
            }
        } else {
            price = prompt("Please enter a price");
            if(price != null) {
                if(isInt(price)) {
                    sellItem(user.uid, listingId, itemId, price, username)
                } else {
                    window.alert("Data type invalid!");
                }
            }
        }
    }

    function submitDelete() {
        if(confirm("Are you sure you want to trash " + capitalize(itemObj.itemTier?.name) + " " + capitalize(itemObj.itemType?.name) + "?")) {
            deleteItem(user.uid, listingId, itemId)
        }
    }

    function submitEdit() {
        let nickname = prompt("Please enter a nickname", itemObj.item?.nickname);
        if(nickname != null)
        {
            if (1 <= nickname.length && nickname.length <= 16) {
                updateItemNickname(itemId, nickname)
            } else {
                window.alert("Nickname must be between 1 and 16 characters!");
            }
        }
    }

    function submitPrice() {
        let newPrice = prompt("Please enter a price", price);
        if(newPrice != null) {
            if(isInt(newPrice)) {
                updatePrice(listingId, newPrice)
            } else {
                    window.alert("Data type invalid!");
            }
        }
    }
    

    
    const itemObj = useItemData(itemId)
    const listerObj = useListerData(listerId);

    return (
        <div className={`rounded-tr-md rounded-bl-md border-l-4 bg-zinc-800 w-full px-4 shadow-lg mb-4 cursor-default`} style={{borderColor:itemObj.itemTier?itemObj.itemTier.color:null}}>
            <div>
            <div className="h-full w-full flex items-center justify-between py-2">
                <div className="mr-4 text-center">
                    {itemObj.itemType? <img src={`images/items/${itemObj.itemType.name}.png`} height="40" width="40" alt="icon" className="rounded-full" /> : null}
                </div>
                <table className="grow">
                    <tbody>
                    <tr>
                        <td className="w-3/6 leading-3">
                            <span className="text-lg text-blue-400" style={{color:itemObj.itemTier?itemObj.itemTier.color:null}}><font className="font-semibold mr-2">{itemObj.itemType?capitalize(itemObj.itemType.name):null}</font><font className="font-light text-base">&quot;{itemObj.item?capitalize(itemObj.item.nickname):null}&quot;</font></span>
                        </td>
                        <td className="w-3/6 leading-3">
                            <div className={`float-right text-sm text-zinc-400 text-right`}>
                                <span className={`text-sm font-semibold py-0 px-1 text-center text-zinc-800 rounded-sm `} style={{backgroundColor:itemObj.itemTier?itemObj.itemTier.color:null}}>
                                    {itemObj.itemTier?itemObj.itemTier.name:null}
                                </span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td  className="w-3/6 leading-3">
                            <span className="text-zinc-400 text-sm mr-2 leading-3">
                            {trans == 'mkt'? 'Listed by ' + listerObj.lister?.name : 'Owned'}
                            </span>
                        </td>
                        <td className="w-3/6 leading-3">
                            
                        </td>
                    </tr>
                    <tr>
                        <td className="w-3/6 leading-3">
                            <span className={`text-sm`} style={{color:transColor(trans)}}>
                                {trans == 'mkt'? price + ' Souls' : 'Added ' + padTo2Digits(date.getDate()).toString() + "/" + padTo2Digits((date.getMonth() + 1)).toString() + "/" + date.getFullYear().toString()}
                            </span>
                        </td>
                        <td className="w-3/6 leading-3">
                            
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            {user?<div className="py-1 border-t border-zinc-400">
            {trans == "mkt" ?<div className="inline-flex">
                    <div onClick={ submitTrans } className="cursor-pointer mr-2 text-sm text-zinc-800 font-semibold bg-blue-400 rounded-sm px-1 py-0 text-center inline-flex items-center">
                        <ShoppingCartIcon className="h-3 mr-1" />
                        <span>{listerId == user.uid ? 'Reclaim' : 'Buy'}</span>
                    </div>
                    {listerId == user.uid ?<div onClick={ submitPrice } className="cursor-pointer mr-2 text-sm text-zinc-800 font-semibold bg-zinc-400 rounded-sm px-1 py-0 text-center inline-flex items-center">
                        <PencilIcon className="h-3 mr-1" />
                        <span>Price</span>
                    </div>:null}
                </div>
                :null}
                {trans == "inv" ?<div className="inline-flex"><div onClick={ submitTrans } className="cursor-pointer mr-2 text-sm text-zinc-800 font-semibold bg-blue-400 rounded-sm px-1 py-0 text-center inline-flex items-center">
                    <ShoppingCartIcon className="h-3 mr-1" />
                    <span>Sell</span>
                </div>
                <div onClick={ submitDelete } className="cursor-pointer mr-2 text-sm text-zinc-800 font-semibold bg-red-400 rounded-sm px-1 py-0 text-center inline-flex items-center">
                    <TrashIcon className="h-3 mr-1" />
                    <span>Trash</span>
                </div></div>:null}
                {trans == "inv" ?<div onClick={ submitEdit } className="cursor-pointer text-sm text-zinc-800 font-semibold mr-2 bg-zinc-400 rounded-sm px-1 py-0 text-center inline-flex items-center">
                        <PencilIcon className="h-3 mr-1" />
                                <span>Nickame</span>
                </div>:null}
                
                
                
                
                
            </div>:null}
            </div>
        </div>
    )
}

export default Listing