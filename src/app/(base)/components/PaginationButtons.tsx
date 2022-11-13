'use client';

import { useRouter } from 'next/navigation';

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
    <div className="flex align-items gap-6 md:justify-center">
      <button
        type="button"
        className="rounded-md bg-primary text-primary-content font-bold p-2 flex-1 md:flex-initial md:w-64 md:py-2 disabled:opacity-40"
        onClick={onClickPrevPage}
        disabled={!currentPage || currentPage === 1}
      >
        이전
      </button>
      <button
        type="button"
        className="rounded-md bg-base-300 font-bold p-2 flex-1 md:flex-initial md:w-64 md:py-2 disabled:opacity-40"
        onClick={onClickNextPage}
        disabled={!nextPage}
      >
        다음
      </button>
    </div>
  );
}

export default PaginationButtons;
