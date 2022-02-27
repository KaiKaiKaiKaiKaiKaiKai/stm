import List from '../components/List'
import ListForm from '../components/ListForm'
import { getAuthUser } from '../components/GetData'


function RecentsArea() {
const user = getAuthUser()

    return (
        <div className="w-full h-auto">
            <div className="bg-zinc-800 h-28 w-full">
                <div className="px-8 h-full w-full max-w-6xl m-auto flex items-center justify-between">
                    <h2 className="text-white text-xl">RECENT LISTINGS</h2>
                </div>
            </div>
            <div className="bg-zinc-900 w-full">
                <div className="px-6 py-4 w-full max-w-6xl m-auto">
                    <div className="flex justify-between">
                        <div className="w-3/6 px-2">
                            <h3 className="text-purple-400 text-lg mb-2 font-base">Want to Sell</h3>
                            <List trans='wts' />
                        </div>
                        <div className="w-3/6 px-2">
                            <h3 className="text-green-400 text-lg mb-2 font-base">Want to Buy</h3>
                            <List trans='wtb' />
                        </div>
                    </div>
                    {user?.email
                        ?   <div className="flex justify-between">
                                <div className="w-3/6 px-2">
                                    <ListForm trans='wts' />
                                </div>
                                <div className="w-3/6 px-2">
                                    <ListForm trans='wtb' />
                                </div>
                                </div>
                        :   <span className="px-2 text-zinc-400 text-base">Sign in to list an item.</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default RecentsArea