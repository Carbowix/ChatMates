import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className="flex h-screen bg-slate-700">
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
          <div className="w-full flex gap-2 items-center justify-center">
            <Image
              width={512}
              height={512}
              src="/logo.png"
              alt="Platforms on Vercel"
              className=" w-16 h-16"
            />
            <div className=" text-5xl font-bold text-white">
              Chat<span className=" text-blue-500">Mates</span>
            </div>
          </div>
          <div className="font-semibold text-2xl text-center">
            Empowering <span className=" text-blue-500">Conversations</span>,
            Building <span className=" text-teal-500">Friendships</span>
          </div>
          <div className="flex gap-2 font-semibold">
            <Link
              className="rounded bg-teal-500 p-4 text-center text-xl ring-teal-600 transition duration-100 hover:bg-teal-600"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="rounded bg-blue-500 p-4 text-center text-xl ring-blue-600 transition duration-100 hover:bg-blue-600"
              href="/register"
            >
              New? Join now!
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
