import { AiOutlineSearch } from 'react-icons/ai'

export default function SearchBar() {
  return (
    <div className="px-4 relative">
      <input
        className="rounded-md bg-slate-700 w-full h-10 px-2"
        type="search"
        placeholder="Search for a chat"
        value={''}
      />
      <div className="rounded-full absolute right-3 top-1/2 -translate-y-1/2 p-3">
        <AiOutlineSearch />
      </div>
    </div>
  )
}
