'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import * as Toast from '../Toast';

export interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toast.ToastContextProvider>{children}</Toast.ToastContextProvider>
    </QueryClientProvider>
  );
}

export default Providers;
