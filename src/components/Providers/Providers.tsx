'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import * as Toast from '../Toast';

export interface ProvidersProps {
  children: React.ReactNode;
  session?: Session | null;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Toast.ToastContextProvider>{children}</Toast.ToastContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default Providers;
