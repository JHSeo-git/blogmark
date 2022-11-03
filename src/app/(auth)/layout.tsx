import Link from 'next/link';

import Hidden from '@/components/Hidden';
import NakedHeader from '@/components/NakedHeader/NakedHeader';
import { getUser } from '@/lib/session';

interface AuthLayoutProps {
  children: React.ReactNode;
}

async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await getUser();

  return (
    <>
      <NakedHeader />
      <main className="absolute inset-0 flex items-center justify-center">
        {user ? (
          <div className="w-[320px] flex flex-col items-center">
            <Hidden>
              <h1>Already Logged In.</h1>
            </Hidden>
            <p className="text-lg font-bold">You already logged in.</p>
            <Link
              href="/"
              className="mt-6 btn btn-block btn-primary no-animation active:bg-primary text-base"
            >
              Home
            </Link>
          </div>
        ) : (
          <>{children}</>
        )}
      </main>
    </>
  );
}

export default AuthLayout;
