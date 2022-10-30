import { withAuth } from 'next-auth/middleware';

import { getSession } from '@/lib/session';

export default withAuth({
  callbacks: {
    async authorized() {
      const session = await getSession();
      return !!session;
    },
  },
});

export const config = { matcher: ['/items/new'] };
