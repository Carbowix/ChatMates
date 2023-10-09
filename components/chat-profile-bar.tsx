'use client'
import { BiArrowBack } from 'react-icons/bi'
import DashboardButtonIcon from './dashboard-button-icon'
import { useRouter } from 'next/navigation'
import Avatar from './avatar'
export default function ChatProfileBar({
  username,
  avatarLink
}: {
  username: string
  avatarLink: string
}) {
  const router = useRouter()
  return (
    <div className="flex items-center w-full h-[9%] bg-slate-900 gap-x-4 px-4">
      <DashboardButtonIcon
        onClick={() => router.push('/dashboard')}
        icon={<BiArrowBack />}
      />
      <Avatar avatarLink={avatarLink} offline />
      <h4 className="font-semibold text-xl">{username}</h4>
    </div>
  )
}
