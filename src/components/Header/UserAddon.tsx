import { useRef, useState } from 'react';

import useOnClickOutside from '@/hooks/useOnClickOutside';

import UserAddonMenu from './UserAddonMenu';

export interface UserAddonProps {
  image?: string | null;
  name?: string | null;
}

function UserAddon({ image, name }: UserAddonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onClick = () => {
    if (!image) {
      return;
    }

    setIsMenuOpen((prev) => !prev);
  };

  const onClose = () => {
    setIsMenuOpen(false);
  };

  // useOnClickOutside(ref, onClose);

  return (
    <div ref={ref} className="flex relative">
      <button type="button" className="avatar placeholder" onClick={onClick}>
        <div className="bg-base-300 rounded-full w-8">
          {image ? (
            <picture>
              <source srcSet={image} type="image/*" />
              <img src={image} alt={`${name} avatar`} />
            </picture>
          ) : (
            <span className="text-xs">{name?.slice(0, 2) ?? 'UN'}</span>
          )}
        </div>
      </button>
      <UserAddonMenu isOpen={isMenuOpen} onClose={onClose} />
    </div>
  );
}

export default UserAddon;
