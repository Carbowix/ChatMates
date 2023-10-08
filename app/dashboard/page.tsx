import DashboardLogo from '@/components/dashboard-logo'
import DashboardProfileBar from '@/components/dashboard-profile-bar'
import DashboardWidget from '@/components/dashboard-widget'
import SearchBar from '@/components/search-bar'
import { getAuthSession } from '../api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
export default async function Dashboard() {
  const userSession = await getAuthSession()
  if (!userSession) return <></>
  const allChats = await prisma.user.findUnique({
    where: { id: userSession.user.id },
    select: {
      ChatRooms: {
        select: {
          id: true,
          users: true,
          messages: {
            orderBy: {
              createdAt: 'desc'
            }
          },
          updatedAt: true
        }
      },
      UnseenMessages: true
    }
  })

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
            {allChats?.ChatRooms.map((chatRoom) => {
              const { name, image } = chatRoom.users.filter(
                (user) => !(user.id === userSession.user.id)
              )[0]
              return (
                <DashboardWidget
                  key={chatRoom.id}
                  chatId={chatRoom.id}
                  currentUserId={userSession.user.id}
                  chatName={name!}
                  chatAvatar={image!}
                  unseenMessages={
                    allChats.UnseenMessages.filter(
                      (message) => message.chatRoomId === chatRoom.id
                    ).length
                  }
                  lastMessage={
                    chatRoom.messages.length > 0
                      ? chatRoom.messages[0]
                      : undefined
                  }
                />
              )
            })}
          </div>
        </div>
        <DashboardLogo
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
