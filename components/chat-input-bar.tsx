'use client'
import { AiOutlineSend } from 'react-icons/ai'
import DashboardButtonIcon from './dashboard-button-icon'
import { BsEmojiSmile } from 'react-icons/bs'
import { useRef, useState } from 'react'
import EmojiPicker, {
  EmojiStyle,
  Theme,
  EmojiClickData
} from 'emoji-picker-react'
import toast from 'react-hot-toast'
import LoadingSpinner from './loadingSpinner'

interface ChatInputBarProps {
  chatId: string
  authorId: string
  recepientId: string
}
export default function ChatInputBar({
  chatId,
  authorId,
  recepientId
}: ChatInputBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setInputValue(
      (inputValue) =>
        inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
    )
  }

  const sendMessage = async () => {
    if (isLoading || !inputValue) return
    setIsLoading(true)
    setShowEmojiPicker(false)
    const response = await fetch('/api/message/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: inputValue,
        authorId,
        recepientId,
        chatId
      })
    })

    if (response.status === 200) {
      setInputValue('')
      inputRef.current?.focus()
    } else {
      toast.error('Something went wrong while sending the message!')
    }
    setIsLoading(false)
  }
  return (
    <div className="w-full flex-grow p-4 flex items-center gap-x-2 mt-auto">
      <div className="relative">
        <DashboardButtonIcon
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          icon={<BsEmojiSmile />}
        />
        <div className="absolute bottom-0 left-0 -translate-y-10 -translate-x-3 z-30">
          {showEmojiPicker && (
            <EmojiPicker
              width={300}
              onEmojiClick={handleEmojiClick}
              lazyLoadEmojis
              autoFocusSearch={false}
              emojiStyle={EmojiStyle.NATIVE}
              theme={Theme.DARK}
            />
          )}
        </div>
      </div>
      <div className="px-4 relative w-full">
        <input
          disabled={isLoading}
          ref={inputRef}
          className="rounded-md bg-slate-700 w-full p-2 pr-10"
          type="text"
          placeholder="Type a message"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              sendMessage()
            }
          }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div
          onClick={() => sendMessage()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3"
        >
          {isLoading ? <LoadingSpinner /> : <AiOutlineSend />}
        </div>
      </div>
    </div>
  )
}
