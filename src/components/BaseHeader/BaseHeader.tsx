import type { Session } from 'next-auth';

import MenuIcon from '../__icons/Menu.Icon';
import { DrawerAction } from '../Drawer';
import SignInButton from '../SignInButton';
import UserAddon from './UserAddon';

interface BaseHeaderProps {
  user?: Session['user'] | null;
}

function BaseHeader({ user }: BaseHeaderProps) {
  return (
    <header className="sticky top-0 left-0 right-0 z-50">
      <div className="px-6 py-4 lg:px-8 lg:py-6 relative max-w-4xl mx-auto">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-base-100 via-base-100" />
        <nav className="min-h-[56px] px-4 py-3 lg:px-8 lg:py-4 flex items-center justify-between bg-base-100 rounded-md shadow-md">
          <DrawerAction>
            <MenuIcon />
          </DrawerAction>
          {user ? <UserAddon image={user.image} name={user.name} /> : <SignInButton />}
        </nav>
      </div>
    </header>
  );
}

export default BaseHeader;
