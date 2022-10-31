import { notFound } from 'next/navigation';

import NakedHeader from '@/components/Header/NakedHeader';
import { getSession } from '@/lib/session';

interface NakedLayoutProps {
  children: React.ReactNode;
}

const getUser = async () => {
  const session = await getSession();

  return session?.user ?? null;
};

async function NakedLayout({ children }: NakedLayoutProps) {
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  return (
    <>
      <NakedHeader />
      <main>{children}</main>
    </>
  );
}

export default NakedLayout;
