import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export interface ProtectedGuardProps {
  children: React.ReactNode;
}

function ProtectedGuard({ children }: ProtectedGuardProps) {
  const router = useRouter();

  useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/');
    },
  });

  return <>{children}</>;
}

export default ProtectedGuard;
