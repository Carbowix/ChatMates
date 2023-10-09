import Avatar from './avatar'

interface ChatMessageNotificationProps {
  author: string
  message: string
  avatarLink: string
  toastVisible: boolean
  onClickHandler: VoidFunction
}
export default function ChatMessageNotification({
  author,
  message,
  avatarLink,
  toastVisible,
  onClickHandler
}: ChatMessageNotificationProps) {
  return (
    <div
      className={`${
        toastVisible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <Avatar avatarLink={avatarLink} offline />
          </div>
          <div className="ml-3 flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
            <p className="text-sm font-medium text-gray-900">{author}</p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={onClickHandler}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  )
}
