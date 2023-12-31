'use client'
import { Message } from '@prisma/client'
import { useEffect, useState, useRef } from 'react'
import ChatMessage from './chat-message'
import { pusherClient } from '@/lib/pusher'
import ChatInputBar from './chat-input-bar'
import LoadingDots from './typing-dots'

interface ChatBoardProps {
  chatId: string
  senderId: string
  receiverId: string
  initMessages: Message[]
}

export default function ChatBoard({
  chatId,
  senderId,
  receiverId,
  initMessages
}: ChatBoardProps) {
  const chatBodyRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>(initMessages)

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      const element = chatBodyRef.current
      element.scrollTop = element.scrollHeight
    }
  }
  useEffect(() => {
    pusherClient.subscribe(`chat-${chatId}`)

    const messageHandler = (message: Message) => {
      setMessages((prev) => [...prev, message])
    }

    pusherClient.bind('incoming-message', messageHandler)

    return () => {
      pusherClient.unsubscribe(`chat-${chatId}`)
      pusherClient.unbind('incoming-message', messageHandler)
    }
  }, [chatId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])
  return (
    <>
      <div
        ref={chatBodyRef}
        className="w-full h-[85%] overflow-y-scroll bg-slate-700 flex flex-col gap-y-4 p-4"
      >
        {messages.map((message) => {
          return (
            <ChatMessage
              key={message.id}
              type={message.userId === senderId ? 'right' : 'left'}
              message={message.content}
            />
          )
        })}
      </div>
      <ChatInputBar
        authorId={senderId}
        recepientId={receiverId}
        chatId={chatId}
      />
    </>
  )
}
