import { z } from 'zod'
import { getAuthSession } from '../../auth/[...nextauth]/route'
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const session = await getAuthSession()
    const { username } = z.object({ username: z.string() }).parse(body)
    if (!session) {
      return new Response('Unauthorized', { status: 401 })
    }
  } catch (e) {
    console.log(e)
    if (e instanceof z.ZodError) {
      return new Response('Invalid request payload', { status: 422 })
    }
    return new Response('Invalid request', { status: 400 })
  }
}
