import { z } from 'zod'
import { getAuthSession } from '../../auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const session = await getAuthSession()
    const { userId } = z.object({ userId: z.string() }).parse(body)
    if (!session) {
      return new Response('Unauthorized', { status: 401 })
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
      await prisma?.friendRequest.delete({
        where: { id: friendRequest.id }
      })

      console.log('Denied friend Request')

      return Response.json(
        { message: 'Friend request denied' },
        { status: 200 }
      )
    } else {
      return Response.json(
        { message: 'Friend request does not exist' },
        { status: 404 }
      )
    }
  } catch (e) {
    console.log(e)
    if (e instanceof z.ZodError) {
      return new Response('Invalid request payload', { status: 422 })
    }
    return new Response('Invalid request', { status: 400 })
  }
}
