import { unstable_getServerSession } from 'next-auth/next';

import { authOptions } from './next-auth';

export function getSession() {
  return unstable_getServerSession(authOptions);
}

export async function getUser() {
  const session = await getSession();

  return session?.user;
}
