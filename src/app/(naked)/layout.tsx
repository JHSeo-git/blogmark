import NakedHeader from '@/components/Header/NakedHeader';

interface NakedLayoutProps {
  children: React.ReactNode;
}

function NakedLayout({ children }: NakedLayoutProps) {
  return (
    <>
      <NakedHeader />
      <main>{children}</main>
    </>
  );
}

export default NakedLayout;
