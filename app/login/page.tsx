import Image from 'next/image'
import Form from '@/components/form'
import Link from 'next/link'
import AuthContainer from '@/components/auth-container'

export default function Login() {
  return (
    <AuthContainer>
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
        <h3 className="text-xl font-semibold">Sign In</h3>
        <p className="text-sm text-gray-500">
          Login to continue your chit-chat
        </p>
      </div>
      <Form type="login" />
    </AuthContainer>
  )
}
