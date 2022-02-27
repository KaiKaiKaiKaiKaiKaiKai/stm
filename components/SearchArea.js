import SearchBar from '../components/SearchBar'

function SearchArea({ subH }) {
  return (
    <div className={`h-[calc(100vh-22.5rem)] bg-zinc-700`}>
      <div className="px-8 h-full w-full max-w-6xl m-auto flex items-center justify-center">
        <SearchBar />
      </div>
    </div>
  )
}

export default SearchArea