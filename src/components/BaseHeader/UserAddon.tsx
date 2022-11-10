'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

import UserIcon from '../__icons/User.Icon';
import UserAddonMenu from './UserAddonMenu';

export interface UserAddonProps {
  image?: string | null;
  name?: string | null;
}

function UserAddon({ image, name }: UserAddonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const onClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div ref={ref} className="flex relative">
      <button type="button" className="avatar placeholder" onClick={onClick}>
        <div className="bg-base-300 rounded-full w-8 relative">
          {image ? (
            <Image src={image} alt={`${name} avatar`} fill loading="lazy" />
          ) : (
            <div className="flex items-center justify-center text-gray-500">
              <UserIcon width={16} height={16} />
            </div>
          )}
        </div>
      </button>
      <UserAddonMenu isOpen={isMenuOpen} onClose={onClose} />
    </div>
  );
}

export default UserAddon;
