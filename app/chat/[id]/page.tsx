import { getAuthSession } from '@/app/api/auth/[...nextauth]/route'
import ChatBoard from '@/components/chat-body'
import ChatProfileBar from '@/components/chat-profile-bar'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ChatPage({ params }: { params: { id: string } }) {
  const filterAllUnseenMessages = async (userId: string, chatId: string) => {
    try {
      await prisma.message.updateMany({
        where: {
          NOT: { userId: userId },
          chatRoomId: chatId
        },
        data: {
          missed: false
        }
      })

      console.log(
        `Updated UnseenMessages for user with ID ${userId} in chatRoomId ${chatId}`
      )
    } catch (error) {
      console.error('Error filtering unseen messages:', error)
      throw error
    }
  }

  const userSession = await getAuthSession()
  if (!userSession) return notFound()
  const currentChat = await prisma.chatRoom.findUnique({
    where: { id: params.id },
    select: {
      users: true,
      messages: {
        orderBy: {
          createdAt: 'asc'
        }
      }
    }
  })

  if (!currentChat) return notFound()
  await filterAllUnseenMessages(userSession.user.id, params.id)

  const otherUser = currentChat?.users.filter(
    (user) => !(user.id == userSession.user.id)
  )[0]
  return (
    <div className="w-screen h-screen bg-slate-600 flex items-center justify-center">
      <div className="w-full h-full lg:w-3/4 lg:h-[98%] rounded-sm bg-slate-800 shadow-xl flex flex-col">
        <ChatProfileBar
          userSessionId={userSession.user.id}
          chatId={params.id}
          username={otherUser?.username!}
          avatarLink={otherUser?.image!}
        />
        <ChatBoard
          senderId={userSession.user.id}
          receiverId={otherUser.id}
          chatId={params.id}
          initMessages={currentChat.messages}
        />
      </div>
    </div>
  )
}
