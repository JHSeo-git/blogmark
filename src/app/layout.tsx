import '@/styles/global.css';

import Providers from '@/components/Providers';
import { getSession } from '@/lib/session';

interface RootLayoutProps {
  children: React.ReactNode;
}

async function RootLayout({ children }: RootLayoutProps) {
  const session = await getSession();

  return (
    <html lang="ko" data-theme="winter" className="antialiased">
      {/* TODO: data-theme */}
      <head />
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}

export default RootLayout;
