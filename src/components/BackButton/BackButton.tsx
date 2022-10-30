'use client';

import { useRouter } from 'next/navigation';

import ChevronLeftIcon from '../__icons/ChevronLeft.icon';

function BackButton() {
  const router = useRouter();

  const onClick = () => {
    router.back();
  };

  return (
    <button type="button" className="flex" onClick={onClick}>
      <ChevronLeftIcon />
    </button>
  );
}

export default BackButton;
