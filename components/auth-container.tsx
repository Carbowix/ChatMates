'use client'

export default function AuthContainer({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-700 text-gray-500 px-2">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        {children}
      </div>
    </div>
  )
}
