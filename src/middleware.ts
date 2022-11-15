/**
 * @see https://nextjs.org/docs/advanced-features/middleware#using-middleware
 * @see https://github.com/shadcn/taxonomy/blob/main/middleware.ts
 *
 * this file always should be located in same directory with /pages (or /app)
 */
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  async (req) => {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/login');
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/', req.url));
      }
      return null;
    }
    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        // pass true to allow all requests
        // because we process all request in the middleware
        return true;
      },
    },
  },
);

export const config = { matcher: ['/items/new', '/login'] };
