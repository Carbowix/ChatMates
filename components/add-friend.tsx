'use client'
import { FormEvent, useState } from 'react'
import LoadingDots from './typing-dots'
import { AiOutlineUserAdd } from 'react-icons/ai'
import toast from 'react-hot-toast'
import DashboardButtonIcon from './dashboard-button-icon'
import { IoIosArrowBack } from 'react-icons/io'
import { useRouter } from 'next/navigation'
export default function AddFriend() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const handleAddRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const response = await fetch('/api/friends/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: event.currentTarget.username.value
      })
    })
    const { message } = await response.json()

    toast[response.status === 200 ? 'success' : 'error'](message)
    setLoading(false)
  }
  return (
    <>
      <div className="text-3xl">
        <div className="flex gap-x-2 items-center py-2">
          <DashboardButtonIcon
            onClick={() => {
              router.push('/dashboard')
            }}
            icon={<IoIosArrowBack />}
          />
          <h2 className="mb-2">Add a friend</h2>
        </div>
        <hr className="style-six w-full" />
      </div>
      <form
        onSubmit={handleAddRequest}
        className="w-full flex gap-x-4 items-center"
      >
        <input
          id="username"
          name="username"
          type="username"
          placeholder="Username"
          min={3}
          max={128}
          required
          className="mt-1 block w-[80%] appearance-none text-black rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
        <button
          disabled={loading}
          className={`${
            loading
              ? 'cursor-not-allowed border-gray-200 bg-gray-100'
              : 'border-blue-500 bg-blue-500 text-white hover:bg-white hover:text-black'
          } flex py-2 w-[20%] items-center justify-center gap-x-2 rounded-md border text-sm transition-all focus:outline-none`}
        >
          {loading ? (
            <LoadingDots color="#808080" />
          ) : (
            <>
              <AiOutlineUserAdd className="h-full w-4 " />
              ADD
            </>
          )}
        </button>
      </form>
    </>
  )
}
