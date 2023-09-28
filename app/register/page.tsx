import Image from 'next/image'
import Form from '@/components/form'
import Link from 'next/link'

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-700 text-gray-500">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-slate-100  px-4 py-6 pt-8 text-center sm:px-16">
          <Link href="/">
            <Image
              src="/logo.png"
              priority
              alt="Logo"
              className="h-16 w-16"
              width={150}
              height={150}
            />
          </Link>
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-sm text-gray-500">
            Create an account with your email and password
          </p>
        </div>
        <Form type="register" />
      </div>
    </div>
  )
}
