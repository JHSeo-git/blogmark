import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

import prisma from '@/lib/prisma';

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error('Please define the GITHUB_ID and GITHUB_SECRET environment variables');
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  callbacks: {
    async session({ session, user }) {
      // eslint-disable-next-line no-param-reassign
      session.user.id = user.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
