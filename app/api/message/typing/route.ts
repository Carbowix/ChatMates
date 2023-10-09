import { boolean, z } from 'zod'
import { getAuthSession } from '../../auth/[...nextauth]/route'
import { pusherServer } from '@/lib/pusher'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const session = await getAuthSession()
    const { status, recepientId, chatId } = z
      .object({
        status: z.boolean(),
        recepientId: z.string(),
        chatId: z.string()
      })
      .parse(body)
    if (!session)
      return Response.json({ message: 'Unauthorized' }, { status: 401 })

    await pusherServer.trigger(`chat-${chatId}`, 'typing-status', {
      userId: session.user.id,
      typingStatus: status
    })
    await pusherServer.trigger(`dashboard-${recepientId}`, 'typing-status', {
      typingStatus: status,
      chatId: chatId
    })

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
