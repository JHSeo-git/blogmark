'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import useLockedBodyEffect from '@/hooks/useLockedBodyEffect';

import Hidden from '../Hidden';

export interface UserAddonMenuProps {
  isOpen: boolean;
  onClose?: () => void;
}

function UserAddonMenu({ isOpen, onClose }: UserAddonMenuProps) {
  useLockedBodyEffect(isOpen);

  const onSignOut = () => {
    signOut();
    onClose?.();
  };

  return (
    <nav>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="user-addon-menu"
              className="absolute top-[100%] right-0 z-20"
              initial={{
                opacity: 0,
                scale: 0.7,
                originX: 1,
                originY: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                transition: {
                  ease: 'easeIn',
                  duration: 0.15,
                },
              }}
            >
              <ul className="border bg-base-100 rounded-sm w-52 mt-1 shadow-lg">
                <li className="border-b">
                  <Link href="/me" className="px-4 py-3 flex w-full hover:bg-base-200">
                    사용자 정보
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="px-4 py-3 flex w-full hover:bg-base-200 transition-colors"
                    onClick={onSignOut}
                  >
                    로그아웃
                  </button>
                </li>
              </ul>
            </motion.div>
            <button type="button" className="fixed inset-0 cursor-default" onClick={onClose}>
              <Hidden>Menu Close</Hidden>
            </button>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default UserAddonMenu;
