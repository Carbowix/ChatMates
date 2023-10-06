'use client'
import Img from 'next/image'

export default function Avatar({
  avatarLink,
  offline,
  bgColor
}: {
  avatarLink: string
  offline: boolean
  bgColor?: string
}) {
  return (
    <div className="relative w-12 h-12 rounded-full">
      <Img
        src={avatarLink}
        alt="profile picture"
        className="w-12 h-10 rounded-full"
        height={120}
        width={120}
      />
      {!offline && (
        <div
          className={`absolute bottom-2 right-0 -translate-x-2 z-10 w-3 h-3 ${bgColor} rounded-full flex justify-center items-center`}
        >
          <div className={`w-2 h-2 bg-green-400 rounded-full`}></div>
        </div>
      )}
    </div>
  )
}
