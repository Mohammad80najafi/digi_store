import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prismadb } from './prismadb';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { User } from '@prisma/client';

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prismadb),
  session: { strategy: 'jwt' },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials?.email as string,
          },
        });
        if (!user) {
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      const u = user as unknown as User;
      if (user) {
        return {
          ...token,
          userId: u.id,
          userRole: u.role,
        };
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          userId: token.userId,
          userRole: token.userRole,
        },
      };
    },
  },
});
