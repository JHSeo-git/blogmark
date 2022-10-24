import '@/styles/global.css';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import ProtectedGuard from '@/components/ProtectedGuard';

export type ProtectedNextPage<P = {}, IP = P> = NextPage<P, IP> & {
  protected?: boolean;
};

type ProtectedAppProps<T> = AppProps<T> & {
  Component: ProtectedNextPage<T>;
};

function MyApp({ Component, pageProps }: ProtectedAppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      {Component.protected ? (
        <ProtectedGuard>
          <Component {...pageProps} />
        </ProtectedGuard>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

export default MyApp;
