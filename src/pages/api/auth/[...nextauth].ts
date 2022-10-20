import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

import prisma from '@/lib/prisma';

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error('Please define the GITHUB_ID and GITHUB_SECRET environment variables');
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};
