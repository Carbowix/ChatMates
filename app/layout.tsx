// These styles apply to every route in the application
import '@/styles/globals.css'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import AuthStatus from '@/components/auth-status'
import { Suspense } from 'react'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
})

const title = {
  default: 'ChatMates',
  template: '%s ChatMates'
}
const description = 'A simple online chatting platform for texting your mates'

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description
  },
  metadataBase: new URL('https://chat-mates.vercel.app/')
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html className="text-white" lang="en">
      <body className={inter.variable}>
        <Toaster />
        <Suspense fallback="Loading...">
          {/*@ts-ignore @ts-expect-error Async Server Component  <AuthStatus /> */}
        </Suspense>
        {children}
      </body>
    </html>
  )
}
