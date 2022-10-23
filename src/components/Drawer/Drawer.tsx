const DRAWER_LABEL = 'my-layout-drawer';

export interface DrawerProps {
  children: React.ReactNode;
}

function Drawer({ children }: DrawerProps) {
  return (
    <div className="drawer">
      <input id={DRAWER_LABEL} type="checkbox" className="drawer-toggle" />
      {children}
    </div>
  );
}

export function DrawerContent({ children }: DrawerProps) {
  return <div className="drawer-content">{children}</div>;
}

export function DrawerSide({ children }: DrawerProps) {
  return (
    <div className="drawer-side">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={DRAWER_LABEL} className="drawer-overlay" />
      {children}
    </div>
  );
}

export function DrawerAction({ children }: DrawerProps) {
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  return (
    <label htmlFor={DRAWER_LABEL} className="lg:hidden">
      {children}
    </label>
  );
}

export default Drawer;
