import Drawer, { DrawerContent, DrawerSide } from '../Drawer';
import Header from '../Header';
import Sidebar from '../Sidebar';

export interface LayoutProps {
  naked?: boolean;
  children: React.ReactNode;
}

function Layout({ naked = false, children }: LayoutProps) {
  if (naked) {
    return (
      <>
        <Header naked />
        <main>{children}</main>
      </>
    );
  }

  return (
    <Drawer>
      <DrawerContent>
        <Header />
        <main>{children}</main>
      </DrawerContent>
      <DrawerSide>
        <Sidebar />
      </DrawerSide>
    </Drawer>
  );
}

export default Layout;
