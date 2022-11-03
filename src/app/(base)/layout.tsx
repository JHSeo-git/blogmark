import BaseHeader from '@/components/BaseHeader/BaseHeader';
import Drawer, { DrawerContent, DrawerSide } from '@/components/Drawer';
import Sidebar from '@/components/Sidebar';
import { getUser } from '@/lib/session';

interface BaseLayoutProps {
  children: React.ReactNode;
}

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
