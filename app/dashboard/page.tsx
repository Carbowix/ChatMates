import ChatLogoDashboard from '@/components/chat-logo-dashboard'
import ChatProfileBar from '@/components/chat-profile-bar'
import ChatWidget from '@/components/chat-widget'
import SearchBar from '@/components/search-bar'

export default function Home() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  return (
    <div className="w-screen h-screen bg-slate-600 flex items-center justify-center">
      <div className="w-full h-full lg:w-3/4 lg:h-[98%] rounded-sm bg-slate-800 border-slate-100 shadow-xl flex">
        <div className="w-full lg:w-[60%] h-full bg-slate-900 flex flex-col gap-2">
          <ChatProfileBar />
          <SearchBar />
          <div className="flex flex-col w-full h-full overflow-y-scroll">
            {arr.map((id) => (
              <ChatWidget key={id} />
            ))}
          </div>
        </div>
        <div className="hidden md:flex w-full h-full bg-slate-700 flex-col justify-center items-center">
          <ChatLogoDashboard />
        </div>
      </div>
    </div>
  )
}
