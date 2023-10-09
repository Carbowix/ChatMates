'use client'
import { BiArrowBack } from 'react-icons/bi'
import DashboardButtonIcon from './dashboard-button-icon'
import { useRouter } from 'next/navigation'
import Avatar from './avatar'
import { useEffect, useState } from 'react'
import { pusherClient } from '@/lib/pusher'
import LoadingDots from './typing-dots'

export default function ChatProfileBar({
  userSessionId,
  chatId,
  username,
  avatarLink
}: {
  userSessionId: string
  chatId: string
  username: string
  avatarLink: string
}) {
  const [isTyping, setIsTyping] = useState(false)
  const router = useRouter()
  useEffect(() => {
    pusherClient.subscribe(`chat-${chatId}`)

    const typingHandler = ({
      userId,
      typingStatus
    }: {
      userId: string
      typingStatus: boolean
    }) => {
      if (userId !== userSessionId) {
        setIsTyping(typingStatus)
      }
    }

    pusherClient.bind('typing-status', typingHandler)

    return () => {
      pusherClient.unsubscribe(`chat-${chatId}`)
      pusherClient.unbind('typing-status', typingHandler)
    }
  }, [userSessionId])
  return (
    <div className="flex items-center w-full h-[9%] bg-slate-900 gap-x-4 px-4">
      <DashboardButtonIcon
        onClick={() => router.push('/dashboard')}
        icon={<BiArrowBack />}
      />
      <Avatar avatarLink={avatarLink} offline />
      <div className="text-xl font-semibold text-white flex gap-x-2">
        {isTyping && <LoadingDots />}
        <h4 className=" text-xl">
          {username} {isTyping ? 'is typing...' : ''}
        </h4>
      </div>
    </div>
  )
}
