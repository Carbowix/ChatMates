'use client'
import Img from 'next/image'
export default function ChatWidget() {
  return (
    <div className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-600 transition-all cursor-pointer">
      <Img
        src={'/user.png'}
        height={128}
        width={128}
        alt="chat profile picture"
        className="w-12 h-12 rounded-full"
      />
      <div className="w-full h-full">
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex justify-between">
            <p className="text-md">Youssef Elmarakshy</p>
            <p className="text-sm font-semibold">12 PM</p>
          </div>

          <div className="flex justify-between">
            <p className="text-sm text-gray-500 w-[90%] text-ellipsis">
              Youssef: Hi!
            </p>
            <p className="rounded-full text-sm bg-slate-500 font-semibold px-1">
              12
            </p>
          </div>
          <hr className="style-six my-2" />
        </div>
      </div>
    </div>
  )
}
