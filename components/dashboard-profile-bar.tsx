'use client'
import { signOut } from 'next-auth/react'
import Img from 'next/image'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { GoSignOut } from 'react-icons/go'
import DashboardButtonIcon from './dashboard-button-icon'
import Avatar from './avatar'
import { useRouter } from 'next/navigation'

interface DashboardProfile {
  name: string
  avatar: string
}

export default function DashboardProfileBar({
  name,
  avatar
}: DashboardProfile) {
  const router = useRouter()
  return (
    <div className="w-full bg-slate-800 flex justify-between p-4">
      <div className="h-full flex gap-2 items-center">
        <Avatar avatarLink={avatar} offline={false} bgColor="bg-slate-800" />
        <div className="font-semibold font-xl">{name}</div>
      </div>
      <div className="flex gap-2">
        {/* TODO: Add friend functionality */}
        <DashboardButtonIcon
          onClick={() => router.push('/dashboard/friends')}
          icon={<AiOutlineUserAdd />}
        />
        <DashboardButtonIcon onClick={() => signOut()} icon={<GoSignOut />} />
      </div>
    </div>
  )
}
