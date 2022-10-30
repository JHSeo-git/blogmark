import Drawer, { DrawerContent, DrawerSide } from '@/components/Drawer';
import BaseHeader from '@/components/Header/BaseHeader';
import Sidebar from '@/components/Sidebar';
import { getSession } from '@/lib/session';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const getUser = async () => {
  const session = await getSession();

  return session?.user;
};

async function BaseLayout({ children }: BaseLayoutProps) {
  const user = await getUser();

  return (
    <Drawer>
      <DrawerContent>
        <BaseHeader user={user} />
        <main>{children}</main>
      </DrawerContent>
      <DrawerSide>
        <Sidebar />
      </DrawerSide>
    </Drawer>
  );
}

export default BaseLayout;
