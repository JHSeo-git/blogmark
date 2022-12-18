import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { nanoid } from 'nanoid';
import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import db from '@/lib/prisma';

import { uploadImage } from './r2';

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error('Please define the GITHUB_ID and GITHUB_SECRET environment variables');
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    'Please define the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables',
  );
}

if (!process.env.R2_DOMAIN_URL) {
  throw new Error('Please define the R2_DOMAIN_URL environment variables');
}

const urlObject = new URL(process.env.R2_DOMAIN_URL);

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user }) {
      if (user.image) {
        if (!user.image.includes(urlObject.hostname)) {
          const imageUrl = await uploadImage({
            id: nanoid(),
            imageUrl: user.image,
            type: 'avatar',
          });

          user.image = imageUrl;
        }
      }

      return true;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
};

export const loginUrl = authOptions.pages?.signIn ?? '/login';
