import NextAuth from 'next-auth';

import { authOptions } from '@/lib/next-auth';

/**
 * @see @/lib/auth
 */
export default NextAuth(authOptions);
