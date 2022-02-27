import Link from 'next/link'
import Image from 'next/image'
import { tierColor, transColor, tierName } from './Color'
import {
    ShoppingCartIcon,
} from "@heroicons/react/solid"

function Listing({title, Icon, href, quantity, price, tier, trans }) {
    return (
        <div className={`border-l-4 border-${tierColor(tier)} bg-zinc-800 w-full px-4 shadow-lg mb-4`}>
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
                                    <span className={`text-lg text-blue-400 underline`}>{title}</span>
                                </a>
                            </Link>
                        </td>
                        <td className="w-3/6 leading-3">
                            
                        </td>
                    </tr>
                    <tr>
                        <td  className="w-3/6 leading-3">
                            <span className="text-zinc-400 text-sm mr-2 leading-3">
                                Qty: {quantity} | Tier: {tier}
                            </span>
                        </td>
                        <td className="w-3/6 leading-3">
                            
                        </td>
                    </tr>
                    <tr>
                        <td className="w-3/6 leading-3">
                            <span className={`text-${transColor(trans)} text-sm`}>
                                {price} Souls each
                            </span>
                        </td>
                        <td className="w-3/6 leading-3">
                            <Link href="/support">
                                <a>
                                    <div className={`float-right text-sm text-zinc-800 font-semibold bg-blue-400 rounded-sm px-1.5 py-0.5 text-center inline-flex items-center`}>
                                        <ShoppingCartIcon className="h-4 mr-1" />
                                        <span> {trans == "wts" ? 'Buy' : 'Sell'}</span>
                                    </div>
                                </a>
                            </Link>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="py-2">
                    <span className={`text-sm font-semibold py-0 px-1 text-center text-zinc-800 mr-1 rounded-sm bg-${transColor(trans)}`}>
                        {trans}
                    </span>
                    <span className={`text-sm font-semibold py-0 px-1 text-center text-zinc-800 mr-1 rounded-sm bg-${tierColor(tier)}`}>
                        {tierName(tier)}
                    </span>
            </div>
            </div>
        </div>
    )
}

export default Listing