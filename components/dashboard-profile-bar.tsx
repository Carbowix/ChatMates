'use client'
import { signOut } from 'next-auth/react'
import Img from 'next/image'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { GoSignOut } from 'react-icons/go'
import DashboardButtonIcon from './dashboard-button-icon'
export default function DashboardProfileBar() {
  return (
    <div className="w-full bg-slate-800 flex justify-between p-4">
      <div className="h-full flex gap-2 items-center">
        <Img
          src="/user.png"
          alt="profile picture"
          className="w-10 h-10 rounded-full"
          height={120}
          width={120}
        />
        <div className="font-semibold font-xl">Youssef Elmarakshy</div>
      </div>
      <div className="flex gap-2">
        {/* TODO: Add friend functionality */}
        <DashboardButtonIcon icon={<AiOutlineUserAdd />} />
        <DashboardButtonIcon onClick={() => signOut()} icon={<GoSignOut />} />
      </div>
    </div>
  )
}
