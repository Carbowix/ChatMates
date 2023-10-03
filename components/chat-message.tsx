interface MessageChat {
  type: 'left' | 'right'
  message: string
}

export default function ChatMessage({ type, message }: MessageChat) {
  return (
    <div
      className={`w-full flex ${
        type == 'left' ? 'justify-start' : 'justify-end'
      }`}
    >
      <div
        className={`p-2 max-w-[50%] text-md break-words flex flex-col justify-between rounded-md  ${
          type == 'left'
            ? 'rounded-tl-none bg-blue-500'
            : 'rounded-tr-none bg-blue-600'
        }`}
      >
        <span>{message}</span>
        <span className="text-right text-xs text-gray-300">12:00 PM</span>
      </div>
    </div>
  )
}
