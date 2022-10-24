import { signIn, useSession } from 'next-auth/react';

import MenuIcon from '../__icons/Menu.Icon';
import { DrawerAction } from '../Drawer';
import HeaderBox from './Header.Box';
import UserAddon from './UserAddon';

function BaseHeader() {
  const { data, status } = useSession();

  const onSignInClick = () => {
    // The redirect option is only available for credentials and email providers.
    signIn('github');
  };

  return (
    <HeaderBox>
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
            로그인
          </button>
        )}
      </nav>
    </HeaderBox>
  );
}

export default BaseHeader;
