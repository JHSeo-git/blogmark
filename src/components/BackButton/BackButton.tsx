'use client';

import { useRouter } from 'next/navigation';

import ChevronLeftIcon from '../__icons/ChevronLeft.Icon';

interface BackButtonProps {
  text?: string;
}

function BackButton({ text }: BackButtonProps) {
  const router = useRouter();

  const onClick = () => {
    router.back();
  };

  return (
    <button type="button" className="inline-flex transition-all" onClick={onClick}>
      <ChevronLeftIcon />
      {text && <span className="ml-2">{text}</span>}
    </button>
  );
}

export default BackButton;
