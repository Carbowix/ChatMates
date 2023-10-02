'use client'

import { type FormEvent, useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import LoadingDots from '@/components/typing-dots'
import toast from 'react-hot-toast'
import Link from 'next/link'
import OAuthButton from './oauth-button'
import AuthDivider from './auth-divider'
import { useSearchParams, useRouter } from 'next/navigation'

type formType = {
  type: 'login' | 'register'
}

const errors = {
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.'
}

export default function Form({ type }: formType) {
  const callbackParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (callbackParams.has('error') && callbackParams.has('callbackUrl')) {
      const errType = callbackParams.get('error')
      if (errType == 'OAuthAccountNotLinked') {
        toast.error(errors['OAuthAccountNotLinked'], {
          duration: 1500
        })
        setTimeout(() => {
          router.push('/login')
        }, 1500)
      }
    }
  }, [callbackParams])

  const handleAuthRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    if (type == 'login') {
      const loginResult = await signIn('credentials', {
        redirect: false,
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value
      })
      console.log(callbackParams)
      if (!loginResult?.error) {
        toast.success('Login Successful!')
        setTimeout(() => {
          router.refresh()
          router.push('/dashboard')
        }, 1500)
      } else {
        setLoading(false)
        toast.error(loginResult?.error!)
      }
    } else {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: event.currentTarget.email.value,
          password: event.currentTarget.password.value
        })
      })

      if (response.status === 200) {
        toast.success('Account created! Redirecting to login...')
        setTimeout(() => {
          router.push('/login')
        }, 1500)
      } else {
        const { error } = await response.json()
        toast.error(error)
        setLoading(false)
      }
    }
  }

  return (
    <div className="bg-slate-200">
      {type == 'login' && (
        <>
          <OAuthButton />
          <AuthDivider />
        </>
      )}

      <form
        onSubmit={handleAuthRequest}
        className="flex flex-col space-y-4 bg-slate-200 px-4 py-8 sm:px-16"
      >
        {type == 'register' && (
          <div>
            <label
              htmlFor="username"
              className="block text-xs text-gray-600 uppercase"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="username"
              placeholder="username"
              autoComplete="username"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-xs text-gray-600 uppercase"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            autoComplete="email"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-xs text-gray-600 uppercase"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        <button
          disabled={loading}
          className={`${
            loading
              ? 'cursor-not-allowed border-gray-200 bg-gray-100'
              : 'border-blue-500 bg-blue-500 text-white hover:bg-white hover:text-black'
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
        >
          {loading ? (
            <LoadingDots color="#808080" />
          ) : (
            <p>{type === 'login' ? 'Sign In' : 'Sign Up'}</p>
          )}
        </button>
        {type === 'login' ? (
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-gray-800">
              Sign up
            </Link>{' '}
          </p>
        ) : (
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-gray-800">
              Sign in
            </Link>{' '}
            instead.
          </p>
        )}
      </form>
    </div>
  )
}
