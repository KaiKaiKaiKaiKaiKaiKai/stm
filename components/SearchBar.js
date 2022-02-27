function SearchBar() {
  return (
    <div className="flex items-center w-full max-w-3xl mx-auto bg-zinc-900 shadow-lg" x-data="{ search: '' }">
        <div className="w-full">
            <input /* type="search" */ className="w-full px-4 py-1 bg-zinc-900 text-white focus:outline-none"
            placeholder="Search" x-model="search" />
        </div>
        <div>
            <button className="flex items-center bg-blue-400 justify-center w-12 h-12 text-zinc-900">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </button>
        </div>
    </div>
  )
}

export default SearchBar