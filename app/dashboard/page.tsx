import DashboardLogo from '@/components/dashboard-logo'
import DashboardProfileBar from '@/components/dashboard-profile-bar'
import SearchBar from '@/components/search-bar'
import { getAuthSession } from '../api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import DashboardChatList from '@/components/dashboard-chat-list'

export default async function Dashboard() {
  const userSession = await getAuthSession()
  if (!userSession) return notFound()
  const allChats = await prisma.user.findUnique({
    where: { id: userSession.user.id },
    select: {
      receivedFriendRequests: true,
      ChatRooms: {
        select: {
          id: true,
          users: true,
          messages: {
            orderBy: {
              createdAt: 'asc'
            }
          },
          updatedAt: true
        }
      }
    }
  })

  const totalMissedMessages =
    allChats?.ChatRooms.reduce((total, chatRoom) => {
      // Use nested reduce to count missed: true in each "messages" array
      const messageCount = chatRoom.messages.reduce((count, message) => {
        if (message.missed && message.userId !== userSession.user.id) {
          return count + 1
        }
        return count
      }, 0)

      // Add the messageCount to the total
      return total + messageCount
    }, 0) || 0

  return (
    <div className="w-screen h-screen bg-slate-600 flex items-center justify-center">
      <div className="w-full h-full lg:w-3/4 lg:h-[98%] rounded-sm bg-slate-800 border-slate-100 shadow-xl flex">
        <div className="w-full lg:w-[60%] h-full bg-slate-900 flex flex-col gap-2">
          <DashboardProfileBar
            name={userSession.user.username!}
            avatar={userSession.user.image!}
            totalFriendRequests={allChats?.receivedFriendRequests.length!}
            userSessionId={userSession.user.id}
          />
          <SearchBar />
          <DashboardChatList
            userSessionId={userSession.user.id}
            chatRooms={allChats?.ChatRooms!}
          />
        </div>
        <DashboardLogo
          totalMissedMessages={totalMissedMessages}
          customText={
            allChats?.ChatRooms.length == 0
              ? 'Add some mates to start chatting!'
              : undefined
          }
        />
      </div>
    </div>
  )
}
