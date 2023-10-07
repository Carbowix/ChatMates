'use client'
import { AiOutlineSend } from 'react-icons/ai'
import DashboardButtonIcon from './dashboard-button-icon'
import { BsEmojiSmile } from 'react-icons/bs'
import { useState } from 'react'
import EmojiPicker, {
  EmojiStyle,
  Theme,
  EmojiClickData
} from 'emoji-picker-react'
export default function ChatInputBar() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [inputValue, setInputValue] = useState<string>('')
  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setInputValue(
      (inputValue) =>
        inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
    )
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
          className="rounded-md bg-slate-700 w-full p-2 pr-10"
          type="text"
          placeholder="Type a message"
          value={inputValue}
        />
        <div className="rounded-full absolute right-3 top-1/2 -translate-y-1/2 p-3">
          <AiOutlineSend />
        </div>
      </div>
    </div>
  )
}
