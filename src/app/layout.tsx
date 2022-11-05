import '@/styles/global.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" data-theme="winter" className="antialiased">
      {/* TODO: data-theme */}
      <head />
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
