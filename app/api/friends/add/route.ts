import { z } from 'zod'
import prisma from '@/lib/prisma'
import { getAuthSession } from '../../auth/[...nextauth]/route'
import { pusherServer } from '@/lib/pusher'

const sendFriendRequest = async (senderId: string, receiverId: string) => {
  const friendRequest = await prisma.friendRequest.create({
    data: {
      senderId,
      receiverId,
      status: 'pending'
    }
  })
  return friendRequest
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const session = await getAuthSession()
    const { username } = z.object({ username: z.string() }).parse(body)
    if (!session) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userToBeAdded = await prisma.user.findUnique({
      where: {
        username: username.toLowerCase()
      },
      select: {
        id: true,
        username: true
      }
    })

    if (!userToBeAdded)
      return Response.json(
        { message: 'No user exists with the given username' },
        {
          status: 404
        }
      )

    if (session.user.id == userToBeAdded?.id)
      return Response.json(
        { message: "You can't add yourself" },
        { status: 400 }
      )

    const existingFriendship = await prisma.user.findFirst({
      where: {
        id: session.user.id,
        AND: { friends: { some: { id: userToBeAdded.id } } }
      }
    })

    if (existingFriendship)
      return Response.json(
        { message: 'You are already friends with this user' },
        {
          status: 409
        }
      )

    const existingFriendRequest = await prisma.friendRequest.findFirst({
      where: {
        AND: [{ senderId: session.user.id }, { receiverId: userToBeAdded.id }]
      }
    })

    if (existingFriendRequest)
      return Response.json(
        { message: 'You have already sent a friend request to this user' },
        { status: 409 }
      )

    const receivedFriendRequest = await prisma.friendRequest.findFirst({
      where: {
        AND: [{ senderId: userToBeAdded.id }, { receiverId: session.user.id }]
      }
    })

    if (receivedFriendRequest) {
      return Response.json(
        { message: 'This user has already sent you a friend request' },
        {
          status: 409
        }
      )
    }

    const friendRequestProcess = await sendFriendRequest(
      session.user.id,
      userToBeAdded.id
    )

    if (friendRequestProcess.id) {
      console.log(JSON.stringify(session))
      await pusherServer.trigger(
        `user-${userToBeAdded.id}-incoming_friend_requests`,
        'incoming_friend_requests',
        {
          id: session.user.id,
          username: session.user.username,
          avatar: session.user.image
        }
      )
    }
    return Response.json({ message: 'Friend Request Sent!' }, { status: 200 })
  } catch (e) {
    console.log(e)
    if (e instanceof z.ZodError) {
      return Response.json(
        { message: 'Invalid request payload' },
        { status: 422 }
      )
    }
    return Response.json({ message: 'Invalid request' }, { status: 400 })
  }
}
