import NextAuth, { getServerSession, type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider, { type GoogleProfile } from 'next-auth/providers/google'
import prisma from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { generateFromEmail } from 'unique-username-generator'
import { comparePassword } from '@/lib/userUtil'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'username' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {}
        if (!email || !password) {
          throw new Error('Missing username or password')
        }
        const user = await prisma.user.findUnique({
          where: { email: email }
        })

        if (
          !user ||
          !user.password ||
          !(await comparePassword(password, user.password))
        ) {
          throw new Error('Invalid account credentials')
        }
        return user
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.username = token.username
      }

      return session
    },

    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email
        }
      })

      if (!dbUser) {
        token.id = user.id
        return token
      }

      if (!dbUser.username) {
        await prisma.user.update({
          where: {
            id: dbUser.id
          },
          data: {
            username: generateFromEmail(
              dbUser.email!,
              Math.floor(Math.random() * 4) + 1
            )
          }
        })
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username
      }
    }
  }
}

const handler = NextAuth(authOptions)
export const getAuthSession = () => getServerSession(authOptions)
export { handler as GET, handler as POST }
