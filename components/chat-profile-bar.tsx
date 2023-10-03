'use client'
import Img from 'next/image'
import { BiArrowBack } from 'react-icons/bi'
import DashboardButtonIcon from './dashboard-button-icon'
import { useRouter } from 'next/navigation'
export default function ChatProfileBar() {
  const router = useRouter()
  return (
    <div className="flex items-center w-full h-[9%] bg-slate-900 gap-x-4 px-4">
      <DashboardButtonIcon
        onClick={() => router.push('/dashboard')}
        icon={<BiArrowBack />}
      />
      <Img
        src={'/user.png'}
        width={128}
        height={128}
        alt="chat profile picture"
        className="w-10 h-10"
      />
      <h4 className="font-semibold text-xl">Youssef Elmarakshy</h4>
    </div>
  )
}
