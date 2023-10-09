import { ReactElement, ButtonHTMLAttributes } from 'react'

interface DashboardButtonIconProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactElement
  counter?: number
}

export default function DashboardButtonIcon({
  icon,
  counter = 0,
  ...props
}: DashboardButtonIconProps) {
  return (
    <button
      {...props}
      className="relative p-2 rounded text-lg text-white hover:bg-gray-200 hover:text-blue-500 transition-all focus:outline-none"
    >
      {icon}
      {counter > 0 && (
        <div className="absolute w-2 h-2 rounded-full bg-red-600 flex justify-center items-center text-sm text-white p-2 right-0 bottom-0">
          2
        </div>
      )}
    </button>
  )
}
