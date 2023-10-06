import DashboardLogo from '@/components/dashboard-logo'
import DashboardProfileBar from '@/components/dashboard-profile-bar'
import DashboardWidget from '@/components/dashboard-widget'
import SearchBar from '@/components/search-bar'
import { getAuthSession } from '../api/auth/[...nextauth]/route'

export default async function Dashboard() {
  const userSession = await getAuthSession()
  if (!userSession) return <></>
  console.log(userSession.user.id, userSession.user.image)
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  return (
    <div className="w-screen h-screen bg-slate-600 flex items-center justify-center">
      <div className="w-full h-full lg:w-3/4 lg:h-[98%] rounded-sm bg-slate-800 border-slate-100 shadow-xl flex">
        <div className="w-full lg:w-[60%] h-full bg-slate-900 flex flex-col gap-2">
          <DashboardProfileBar
            name={userSession.user.username!}
            avatar={userSession.user.image!}
          />
          <SearchBar />
          <div className="flex flex-col w-full h-full overflow-y-scroll">
            {arr.map((id) => (
              <DashboardWidget key={id} />
            ))}
          </div>
        </div>
        <DashboardLogo />
      </div>
    </div>
  )
}
