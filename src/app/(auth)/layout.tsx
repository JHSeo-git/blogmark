import Hidden from '@/components/Hidden';
import NakedHeader from '@/components/NakedHeader/NakedHeader';

interface AuthLayoutProps {
  children: React.ReactNode;
}

async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <NakedHeader />
      <main className="absolute inset-0 flex items-center justify-center">
        <Hidden>
          <h1>Login</h1>
        </Hidden>
        {/* {user ? (
          <div className="w-[320px] flex flex-col items-center">
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
        )} */}
        {children}
      </main>
    </>
  );
}

export default AuthLayout;
