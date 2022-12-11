import type { Session } from 'next-auth';

import MenuIcon from '../__icons/Menu.Icon';
import { DrawerAction } from '../Drawer';
import SignInDialogButton from '../SignInDialogButton';
import UserAddon from './UserAddon';

interface BaseHeaderProps {
  user?: Session['user'] | null;
}

function BaseHeader({ user }: BaseHeaderProps) {
  return (
    <header className="sticky top-0 left-0 right-0 z-50">
      <div className="px-4 py-4 lg:px-8 lg:py-6 max-w-4xl mx-auto">
        <div className="absolute top-0 left-0 right-0 bottom-1/2 -z-10 bg-base-100 opacity-70 md:hidden" />
        <nav className="min-h-[56px] px-4 py-3 lg:px-8 lg:py-4 flex items-center justify-between bg-base-100 rounded-md shadow-md lg:shadow-xl">
          <DrawerAction>
            <MenuIcon />
          </DrawerAction>
          {user ? (
            <UserAddon image={user.image} name={user.name} />
          ) : (
            <SignInDialogButton>로그인</SignInDialogButton>
          )}
        </nav>
      </div>
    </header>
  );
}

export default BaseHeader;
