import List from '../components/List'
import { useContext } from "react"
import { UserContext } from "../lib/context"


function RecentsArea() {

    const {user, username, souls} = useContext(UserContext)

    return (
        <div className="w-full h-auto">
            {/*<div className="bg-zinc-800 h-28 w-full">
                <div className="px-8 h-full w-full max-w-6xl m-auto flex items-center justify-between">
                    <h2 className="text-white text-xl">ITEM TRADING</h2>
                </div>
            </div>*/}
            <div className="bg-zinc-900 w-full">
                <div className="px-6 py-4 w-full max-w-6xl m-auto">
                    <div className="grid grid-cols-1 grid-flow-row md:grid-flow-col md:grid-cols-2">
                        <div className="w-full px-2">
                            <h3 className="text-purple-400 text-lg mb-2 font-base">Market</h3>
                            <List trans='mkt' />
                        </div>
                        <div className="w-full px-2">
                            <h3 className="text-green-400 text-lg mb-2 font-base">Inventory</h3>
                            {user
                                ? <List trans='inv' />
                                : <span className="text-zinc-400 text-base">Sign in to manage your inventory.</span>
                            }
                        </div>
                    </div>
                        {/*user
                           ? <div className="flex justify-between">
                                <div className="w-3/6 px-2">
                                    <ListForm trans='mkt' bgColor={Colors.mkt} />
                                </div>
                                <div className="w-3/6 px-2">
                                    <ListForm trans='inv' bgColor={Colors.inv} />
                                </div>
                                </div>
                           : <span className="px-2 text-zinc-400 text-base">Sign in to list an item.</span>
                        */}

                        <span className="px-2 text-zinc-400 text-base">Version alpha 2.1</span>
                </div>
            </div>
        </div>
    )
}

export default RecentsArea