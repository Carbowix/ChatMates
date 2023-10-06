import { getAuthSession } from '@/app/api/auth/[...nextauth]/route'
import AddFriend from '@/components/add-friend'
import FriendRequests from '@/components/friend-requests'
import prisma from '@/lib/prisma'

export default async function FriendsPage() {
  const session = await getAuthSession()
  if (!session) return <></>
  const incomingFriendRequests = await prisma.user.findUnique({
    where: { id: session?.user.id },
    select: {
      receivedFriendRequests: {
        select: {
          sender: {
            select: {
              id: true,
              username: true,
              image: true
            }
          }
        }
      }
    }
  })
  console.log(JSON.stringify(incomingFriendRequests))
  return (
    <div className="w-screen h-screen bg-slate-600 flex items-center justify-center">
      <div className="w-full h-full lg:w-3/4 lg:h-[98%] rounded-sm bg-slate-800 border-slate-100 shadow-xl p-2 md:p-4">
        <div className="h-full w-full md:w-1/2 flex flex-col gap-y-4">
          <AddFriend />
          <div className="text-3xl">
            <h2 className="mb-2">Friends Requests</h2>
            <hr className="style-six w-full" />
          </div>
          <FriendRequests
            initialFriendRequests={incomingFriendRequests}
            sessionId={session.user.id}
          />
        </div>
      </div>
    </div>
  )
}
