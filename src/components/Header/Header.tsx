import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import MenuIcon from '../__icons/Menu.Icon';
import { DrawerAction } from '../Drawer';

export interface HeaderProps {}

function Header(props: HeaderProps) {
  const { data, status } = useSession();

  const onClick = () => {
    signOut({ redirect: false });
  };

  return (
    <header className="sticky top-0 left-0 right-0">
      <div className="p-4 lg:p-8 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-base-100 to-transparent" />
        <nav className="px-4 py-2 lg:px-8 lg:py-4 flex items-center justify-between bg-base-100 rounded-md shadow-md">
          <DrawerAction>
            <MenuIcon />
          </DrawerAction>
          {status === 'loading' && 'loading...'}
          {status === 'authenticated' && (
            <div className="avatar placeholder">
              <div className="bg-base-300 rounded-full w-8">
                {data.user?.image ? (
                  <picture>
                    <source srcSet={data.user.image} type="image/*" />
                    <img src={data.user.image} alt={`${data.user?.name} avatar`} />
                  </picture>
                ) : (
                  <span className="text-xs">{data.user?.name?.slice(0, 2) ?? 'UN'}</span>
                )}
              </div>
            </div>
          )}
          {status === 'unauthenticated' && 'unauthenticated'}
        </nav>
      </div>
    </header>
  );
}

export default Header;
