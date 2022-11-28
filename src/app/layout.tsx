import '@/styles/global.css';

import Providers from '@/components/Providers';

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" data-theme="winter" className="antialiased">
      {/* TODO: data-theme */}
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export default RootLayout;
