export const DRAWER_LABEL = 'my-layout-drawer';
export const DRAWER_CONTENT = 'my-layout-drawer-content';

export interface DrawerProps {
  children: React.ReactNode;
}

function Drawer({ children }: DrawerProps) {
  return (
    <div className="drawer">
      <input id={DRAWER_LABEL} type="checkbox" className="drawer-toggle" defaultChecked={false} />
      {children}
    </div>
  );
}

export function DrawerContent({ children }: DrawerProps) {
  return (
    <div id={DRAWER_CONTENT} className="drawer-content">
      {children}
    </div>
  );
}

export function DrawerSide({ children }: DrawerProps) {
  return (
    <div className="drawer-side">
      <label htmlFor={DRAWER_LABEL} className="drawer-overlay" />
      {children}
    </div>
  );
}

export function DrawerAction({ children }: DrawerProps) {
  return (
    <label htmlFor={DRAWER_LABEL} className="cursor-pointer">
      {children}
    </label>
  );
}

export default Drawer;
