'use client'
import { signOut } from 'next-auth/react'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { GoSignOut } from 'react-icons/go'
import DashboardButtonIcon from './dashboard-button-icon'
import Avatar from './avatar'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { pusherClient } from '@/lib/pusher'
import { newMessageNotifcation } from './dashboard-chat-list'

interface DashboardProfile {
  name: string
  avatar: string
  totalFriendRequests: number
  userSessionId: string
}

export default function DashboardProfileBar({
  name,
  avatar,
  totalFriendRequests = 0,
  userSessionId
}: DashboardProfile) {
  const router = useRouter()
  const [friendRequestsCounter, setFriendRequestsCounter] =
    useState<number>(totalFriendRequests)
  useEffect(() => {
    pusherClient.subscribe(`user-${userSessionId}-incoming_friend_requests`)
    const incomingFriendRequestHandler = ({
      username,
      avatar
    }: {
      username: string
      avatar: string
    }) => {
      newMessageNotifcation('Incoming Friend Request!', avatar, username)
      setFriendRequestsCounter((prev) => prev + 1)
    }

    pusherClient.bind('incoming_friend_requests', incomingFriendRequestHandler)
    return () => {
      pusherClient.unsubscribe(`user-${userSessionId}-incoming_friend_requests`)
      pusherClient.unbind('incoming-message', incomingFriendRequestHandler)
    }
  }, [userSessionId])
  return (
    <div className="w-full bg-slate-800 flex justify-between p-4">
      <div className="h-full flex gap-2 items-center">
        <Avatar avatarLink={avatar} offline={false} bgColor="bg-slate-800" />
        <div className="font-semibold font-xl">{name}</div>
      </div>
      <div className="flex gap-2">
        {/* TODO: Add friend functionality */}
        <DashboardButtonIcon
          onClick={() => router.push('/dashboard/friends')}
          icon={<AiOutlineUserAdd />}
          counter={friendRequestsCounter}
        />
        <DashboardButtonIcon onClick={() => signOut()} icon={<GoSignOut />} />
      </div>
    </div>
  )
}
