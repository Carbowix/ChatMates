import { z } from 'zod'
import { getAuthSession } from '../../auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const session = await getAuthSession()
    const { userId } = z.object({ userId: z.string() }).parse(body)
    if (!session) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const friendRequest = await prisma?.friendRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: session.user.id
      },
      select: {
        id: true
      }
    })

    if (friendRequest) {
      await prisma?.user.update({
        where: {
          id: session.user.id
        },
        data: {
          friends: {
            connect: {
              id: userId
            }
          },
          friendsOf: {
            connect: {
              id: userId
            }
          }
        }
      })

      await prisma?.friendRequest.delete({
        where: { id: friendRequest.id }
      })

      await prisma.chatRoom.create({
        data: {
          users: {
            connect: [{ id: session.user.id }, { id: userId }]
          }
        }
      })

      console.log('Accepted friend Request')

      return Response.json(
        { message: 'Friend request accepted!' },
        { status: 200 }
      )
    } else {
      return Response.json(
        { message: 'Friend request does not exist!' },
        { status: 404 }
      )
    }
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
