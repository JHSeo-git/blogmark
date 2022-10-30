import { headers } from 'next/headers';
import type { Session } from 'next-auth';

export async function getSession(): Promise<Session | null> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: headers(),
  });

  if (!response?.ok) {
    return null;
  }

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}
