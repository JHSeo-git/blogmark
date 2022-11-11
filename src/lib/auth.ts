import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { nanoid } from 'nanoid';
import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

import prisma from '@/lib/prisma';
import userService from '@/services/user.service';

import { uploadImage } from './r2';

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
    async signIn({ user }) {
      if (user.image) {
        // FIXME: change domain
        if (!user.image.includes('pub-f32feec30d8e4eee8750681495853339.r2.dev')) {
          const imageUrl = await uploadImage({
            id: nanoid(),
            imageUrl: user.image,
            type: 'avatar',
          });

          await userService.updateUserImage({
            userId: user.id,
            imageUrl,
          });
        }
      }

      return true;
    },
    async session({ session, user }) {
      // eslint-disable-next-line no-param-reassign
      session.user.id = user.id;
      return session;
    },
  },
};
