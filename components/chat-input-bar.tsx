import { AiOutlineSend } from 'react-icons/ai'
import DashboardButtonIcon from './dashboard-button-icon'
import { BsEmojiSmile } from 'react-icons/bs'
export default function ChatInputBar() {
  return (
    <div className="w-full flex-grow p-4 flex items-center gap-x-2 mt-auto">
      <DashboardButtonIcon icon={<BsEmojiSmile />} />
      <div className="px-4 relative w-full">
        <input
          className="rounded-md bg-slate-700 w-full p-2 pr-10"
          type="text"
          placeholder="Type a message"
        />
        <div className="rounded-full absolute right-3 top-1/2 -translate-y-1/2 p-3">
          <AiOutlineSend />
        </div>
      </div>
    </div>
  )
}
