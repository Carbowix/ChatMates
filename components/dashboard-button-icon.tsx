import { ReactElement, ButtonHTMLAttributes } from 'react'

interface DashboardButtonIconProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactElement
}

export default function DashboardButtonIcon({
  icon,
  ...props
}: DashboardButtonIconProps) {
  return (
    <button
      {...props}
      className="p-2 rounded text-md text-white hover:bg-gray-200 hover:text-blue-500 transition-all focus:outline-none"
    >
      {icon}
    </button>
  )
}
