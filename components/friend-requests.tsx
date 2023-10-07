'use client'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import Avatar from './avatar'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { pusherClient } from '@/lib/pusher'
import toast from 'react-hot-toast'

interface friendRequest {
  sender: {
    id: string
    username: string | null
    image: string | null
  }
}

interface FriendRequestsProps {
  initialFriendRequests: {
    receivedFriendRequests: friendRequest[]
  } | null
  sessionId: string
}

export default function FriendRequests({
  initialFriendRequests,
  sessionId
}: FriendRequestsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [friendRequests, setFriendRequests] = useState<friendRequest[]>(
    initialFriendRequests?.receivedFriendRequests!
  )

  const handleFriendRequest = async (
    type: 'accept' | 'deny',
    userId: string
  ) => {
    setLoading(true)
    const friendRequestResponse = await fetch(`/api/friends/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId
      })
    })

    const { message } = await friendRequestResponse.json()

    if (friendRequestResponse.status === 200) {
      toast.success(message)
      setFriendRequests((prev) =>
        prev.filter((request) => request.sender.id !== userId)
      )
      router.refresh()
    } else {
      toast.error(message)
    }
  }

  useEffect(() => {
    pusherClient.subscribe(`user-${sessionId}-incoming_friend_requests`)
    console.log('listening to ', `user-${sessionId}-incoming_friend_requests`)

    const friendRequestHandler = (friendRequest: friendRequest) => {
      toast('Incoming Friend Request', { icon: 'ℹ️' })
      setFriendRequests((prev) => [...prev, friendRequest])
    }

    pusherClient.bind('incoming_friend_requests', friendRequestHandler)

    return () => {
      pusherClient.unsubscribe(`user-${sessionId}-incoming_friend_requests`)
      pusherClient.unbind('incoming_friend_requests', friendRequestHandler)
    }
  }, [sessionId])

  return (
    <div className="flex flex-col flex-grow w-full gap-y-2 md:w-1/2">
      {friendRequests?.map((request) => {
        return (
          <div
            key={request.sender.username}
            className="w-full flex gap-x-4 hover:bg-gray-600 transition-all cursor-pointer items-center p-2 border-b-2 border-gray-500"
          >
            <Avatar
              avatarLink={request.sender.image!}
              offline
              bgColor="bg-slate-800"
            />
            <p className="text-xl">{request.sender.username}</p>
            <button
              disabled={loading}
              onClick={() => handleFriendRequest('accept', request.sender.id)}
              className={
                loading
                  ? 'cursor-not-allowed border-gray-200 bg-gray-100'
                  : 'hover:border-green-500 hover:bg-green-500 transition-all cursor-pointer duration-100' +
                    ` flex items-center justify-center w-8 h-8 rounded-full `
              }
            >
              <AiOutlineCheck />
            </button>
            <button
              disabled={loading}
              onClick={() => handleFriendRequest('deny', request.sender.id)}
              className={
                loading
                  ? 'cursor-not-allowed border-gray-200 bg-gray-100'
                  : 'hover:border-red-500 hover:bg-red-500 transition-all cursor-pointer duration-100' +
                    ` flex items-center justify-center w-8 h-8 rounded-full `
              }
            >
              <AiOutlineClose />
            </button>
          </div>
        )
      })}
    </div>
  )
}
