'use client';

import { useRouter } from 'next/navigation';

import ChevronLeftIcon from '@/components/__icons/ChevronLeft.Icon';
import Hidden from '@/components/Hidden';

export interface PaginationButtonsProps {
  currentPage?: number | null;
  nextPage?: number | null;
}

function PaginationButtons({ currentPage, nextPage }: PaginationButtonsProps) {
  const router = useRouter();

  const onClickPrevPage = () => {
    if (!currentPage) {
      return;
    }
    router.push(`/?page=${currentPage - 1}`);
  };

  const onClickNextPage = () => {
    if (!nextPage) {
      return;
    }
    router.push(`/?page=${nextPage}`);
  };
  return (
    <div className="flex align-items gap-6 md:justify-end">
      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-md bg-primary text-primary-content font-bold p-2 flex-1 md:flex-initial disabled:opacity-40"
        onClick={onClickPrevPage}
        disabled={!currentPage || currentPage === 1}
      >
        <ChevronLeftIcon />
      </button>
      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-md bg-primary text-primary-content font-bold p-2 flex-1 md:flex-initial disabled:opacity-40"
        onClick={onClickNextPage}
        disabled={!nextPage}
      >
        <ChevronLeftIcon className="rotate-180" />
      </button>
    </div>
  );
}

export default PaginationButtons;
