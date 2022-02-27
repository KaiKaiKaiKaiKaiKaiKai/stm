import SearchArea from '../components/SearchArea'
import RecentsArea from '../components/RecentsArea'

export default function Home() {
  return (
    <div>

      {/* Nav */}
      <SearchArea subH="10.5"/>

      {/* Results */}
      <RecentsArea />

    </div>
  )
}
