import NakedHeader from '@/components/NakedHeader/NakedHeader';

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
