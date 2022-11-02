import { redirect } from 'next/navigation';

import BackButton from '@/components/BackButton';
import NakedHeader from '@/components/NakedHeader/NakedHeader';
import { getSession } from '@/lib/session';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const getUser = async () => {
  const session = await getSession();

  return session?.user;
};

async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await getUser();

  if (user) {
    return redirect('/');
  }

  return (
    <>
      <NakedHeader />
      <main className="absolute inset-0 flex items-center justify-center">{children}</main>
    </>
  );
}

export default AuthLayout;
