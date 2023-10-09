import { z } from 'zod'
import { getAuthSession } from '../../auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import { pusherServer } from '@/lib/pusher'
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const session = await getAuthSession()
    const { message, authorId, recepientId, chatId } = z
      .object({
        message: z.string(),
        authorId: z.string(),
        recepientId: z.string(),
        chatId: z.string()
      })
      .parse(body)

    if (!session) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const newMessage = await prisma.message.create({
      data: {
        content: message,
        sender: {
          connect: { id: authorId }
        },
        ChatRoom: {
          connect: { id: chatId }
        }
      }
    })

    if (newMessage) {
      await pusherServer.trigger(
        `chat-${chatId}`,
        'incoming-message',
        newMessage
      )
      await pusherServer.trigger(
        `dashboard-${recepientId}`,
        'incoming-message',
        {
          username: session.user.name,
          avatar: session.user.image,
          message: newMessage
        }
      )
    }
    return Response.json({ message: 'OK' }, { status: 200 })
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
