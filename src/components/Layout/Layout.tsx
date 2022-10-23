import Drawer, { DrawerContent, DrawerSide } from '../Drawer';
import Header from '../Header';
import Sidebar from '../Sidebar';

export interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Drawer>
        <DrawerContent>
          <Header />
          <main>{children}</main>
        </DrawerContent>
        <DrawerSide>
          <Sidebar />
        </DrawerSide>
      </Drawer>
    </div>
  );
}

export default Layout;
