'use client'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

export default function OAuthButton() {
  return (
    <div className="w-full text-center">
      <button
        onClick={() => signIn('google')}
        className="rounded-xl p-2 my-4 border-2 border-slate-300 transition duration-100 hover:bg-slate-300"
      >
        <Image
          src="/google.png"
          priority
          alt="Sign in with google"
          className="h-8 w-8"
          width={150}
          height={150}
        />
      </button>
    </div>
  )
}
