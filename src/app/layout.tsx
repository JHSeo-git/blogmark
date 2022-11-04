import '@/styles/global.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" data-theme="winter">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </head>
      {/* TODO: data-theme */}
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
