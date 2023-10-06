'use client'
import Img from 'next/image'
export default function DashboardLogo() {
  return (
    <div className="hidden md:flex w-full h-full bg-slate-700 flex-col justify-center items-center">
      <Img
        src={'/logo.png'}
        width={128}
        height={128}
        alt="dashboard chat logo"
        className="w-24 h-24"
      />
      <h2 className="font-semibold text-2xl text-center">
        Pick any conversation to start chatting!
      </h2>
    </div>
  )
}
