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
        {children}
      </main>
    </>
  );
}

export default AuthLayout;
