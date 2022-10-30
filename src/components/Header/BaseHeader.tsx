import type { Session } from 'next-auth';

import MenuIcon from '../__icons/Menu.Icon';
import { DrawerAction } from '../Drawer';
import SignInButton from '../SignInButton';
import HeaderBox from './Header.Box';
import UserAddon from './UserAddon';

interface BaseHeaderProps {
  user?: Session['user'] | null;
}

function BaseHeader({ user }: BaseHeaderProps) {
  return (
    <HeaderBox>
      <nav className="min-h-[56px] px-4 py-3 lg:px-8 lg:py-4 flex items-center justify-between bg-base-100 rounded-md shadow-md">
        <DrawerAction>
          <MenuIcon />
        </DrawerAction>
        {user ? <UserAddon image={user.image} name={user.name} /> : <SignInButton />}
      </nav>
    </HeaderBox>
  );
}

export default BaseHeader;
