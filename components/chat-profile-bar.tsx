'use client'
import { signOut } from 'next-auth/react'
import Img from 'next/image'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { GoSignOut } from 'react-icons/go'
export default function ChatProfileBar() {
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
        <button className="p-2 rounded text-md text-white hover:bg-gray-200 hover:text-blue-500 transition-all focus:outline-none">
          <AiOutlineUserAdd />
        </button>
        <button
          onClick={() => signOut()}
          className="p-2 rounded text-lg text-white hover:bg-gray-200 hover:text-blue-500 transition-all focus:outline-none"
        >
          <GoSignOut />
        </button>
      </div>
    </div>
  )
}
