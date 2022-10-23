import { signIn, useSession } from 'next-auth/react';

import MenuIcon from '../__icons/Menu.Icon';
import { DrawerAction } from '../Drawer';
import UserAddon from './UserAddon';

export interface HeaderProps {}

function Header(props: HeaderProps) {
  const { data, status } = useSession();

  const onSignInClick = () => {
    // The redirect option is only available for credentials and email providers.
    signIn('github');
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
            <UserAddon image={data?.user?.image} name={data?.user?.name} />
          )}
          {status === 'unauthenticated' && (
            <button type="button" onClick={onSignInClick}>
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
