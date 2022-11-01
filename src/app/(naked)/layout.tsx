import NakedHeader from '@/components/Header/NakedHeader';

interface NakedLayoutProps {
  children: React.ReactNode;
}

async function NakedLayout({ children }: NakedLayoutProps) {
  return (
    <>
      <NakedHeader />
      <main>{children}</main>
    </>
  );
}

export default NakedLayout;
