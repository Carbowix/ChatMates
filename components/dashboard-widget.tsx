'use client'
import { formatMessageDate } from '@/lib/util'
import { Message } from '@prisma/client'
import Img from 'next/image'
import Avatar from './avatar'
import { useRouter } from 'next/navigation'
interface DashboardWidgetProps {
  currentUserId: string
  chatId: string
  chatName: string
  chatAvatar: string
  lastMessage?: Message
  unseenMessages?: number
}
export default function DashboardWidget({
  currentUserId,
  chatId,
  chatName,
  chatAvatar,
  lastMessage,
  unseenMessages
}: DashboardWidgetProps) {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push('/chat/' + chatId)}
      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-600 transition-all cursor-pointer"
    >
      <Avatar avatarLink={chatAvatar} offline />
      <div className="w-full h-full">
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex justify-between">
            <p className="text-md">{chatName}</p>
            {lastMessage && (
              <p className="text-sm font-semibold">
                {formatMessageDate(new Date(lastMessage.createdAt))}
              </p>
            )}
          </div>

          <div className="flex justify-between">
            <p className="text-sm text-gray-500 w-[90%] text-ellipsis">
              {/* Hacky way until group chat is supported x) */}
              {lastMessage
                ? `${
                    currentUserId == lastMessage.userId
                      ? 'You:'
                      : chatName + ':'
                  } ${lastMessage.content}`
                : 'Start a conversation!'}
            </p>
            {unseenMessages !== 0 && (
              <p className="rounded-full text-sm bg-slate-500 font-semibold px-1">
                {unseenMessages}
              </p>
            )}
          </div>
          <hr className="style-six my-2" />
        </div>
      </div>
    </div>
  )
}
