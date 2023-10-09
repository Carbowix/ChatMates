'use client'
import toast from 'react-hot-toast'
import ChatMessageNotification from './chat-message-notification'
import { type Message, User } from '@prisma/client'
import DashboardWidget from './dashboard-widget'
import { useEffect, useState } from 'react'
import { pusherClient } from '@/lib/pusher'
import { AiOutlineSearch } from 'react-icons/ai'

type extendedChatRoom = {
  id: string
  users: User[]
  messages: Message[]
  updatedAt: Date
}

type websocketMessage = {
  username: string
  avatar: string
  message: Message
}

interface DashboardChatListProps {
  userSessionId: string
  chatRooms: extendedChatRoom[]
}

export const newMessageNotifcation = (
  message: string,
  avatarLink: string,
  authorName: string
) => {
  toast.custom((t) => (
    <ChatMessageNotification
      author={authorName}
      avatarLink={avatarLink}
      message={message}
      onClickHandler={() => toast.dismiss(t.id)}
      toastVisible={t.visible}
    />
  ))
}

export default function DashboardChatList({
  chatRooms,
  userSessionId
}: DashboardChatListProps) {
  const [searchInput, setSearchInput] = useState<string>('')
  const [allChatRooms, setChatRooms] = useState<extendedChatRoom[]>(chatRooms)
  const [filteredChatRooms, setfilteredChatRooms] = useState<
    extendedChatRoom[]
  >([])
  const handleSearchChange = (value: string) => {
    setSearchInput(value)
    const filteredData = allChatRooms.filter((chatRoom) => {
      const { name } = chatRoom.users.filter(
        (user) => !(user.id === userSessionId)
      )[0]
      return name?.toLowerCase().includes(value)
    })

    setfilteredChatRooms(filteredData)
  }
  useEffect(() => {
    pusherClient.subscribe(`dashboard-${userSessionId}`)
    const incomingMessageHandler = ({
      message,
      username,
      avatar
    }: websocketMessage) => {
      const chatRoomIndex = allChatRooms.findIndex(
        (chatRoom) => chatRoom.id === message.chatRoomId
      )
      if (chatRoomIndex !== -1) {
        const updatedChatRooms = [...allChatRooms]
        updatedChatRooms[chatRoomIndex].messages.push(message)
        // Remove the chat room from its current position
        const movedChatRoom = updatedChatRooms.splice(chatRoomIndex, 1)[0]

        // Add the chat room to the beginning of the array
        updatedChatRooms.unshift(movedChatRoom)
        setChatRooms(updatedChatRooms)
        newMessageNotifcation(message.content, avatar, username)
      }
    }

    pusherClient.bind('incoming-message', incomingMessageHandler)
    return () => {
      pusherClient.unsubscribe(`dashboard-${userSessionId}`)
      pusherClient.unbind('incoming-message', incomingMessageHandler)
    }
  }, [userSessionId])

  return (
    <>
      <div className="px-4 relative">
        <input
          className="rounded-md bg-slate-700 w-full h-10 px-2"
          type="search"
          placeholder="Search for a chat"
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <div className="rounded-full absolute right-3 top-1/2 -translate-y-1/2 p-3">
          <AiOutlineSearch />
        </div>
      </div>
      <div className="flex flex-col w-full h-full overflow-y-scroll">
        {(searchInput ? filteredChatRooms : allChatRooms).map((chatRoom) => {
          const { name, image } = chatRoom.users.filter(
            (user) => !(user.id === userSessionId)
          )[0]
          return (
            <DashboardWidget
              key={chatRoom.id}
              chatId={chatRoom.id}
              currentUserId={userSessionId}
              chatName={name!}
              chatAvatar={image!}
              unseenMessages={
                chatRoom.messages.filter(
                  (message) =>
                    message.userId !== userSessionId && message.missed
                ).length
              }
              lastMessage={
                chatRoom.messages.length > 0
                  ? chatRoom.messages[chatRoom.messages.length - 1]
                  : undefined
              }
            />
          )
        })}
      </div>
    </>
  )
}
