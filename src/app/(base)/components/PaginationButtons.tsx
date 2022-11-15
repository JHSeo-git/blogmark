'use client';

import { useRouter } from 'next/navigation';

import ChevronLeftIcon from '@/components/__icons/ChevronLeft.Icon';
import PageButton from '@/components/PageButton';

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

  const hasPrev = currentPage && currentPage > 1;
  const hasNext = nextPage;

  if (!hasPrev && !hasNext) {
    return null;
  }

  return (
    <div className="flex align-items gap-6 p-4 py-10 md:p-6 md:justify-end">
      <div className="flex-1 md:flex-initial">
        {hasPrev && (
          <PageButton className="btn-block" onClick={onClickPrevPage} disabled={!hasPrev}>
            <ChevronLeftIcon />
          </PageButton>
        )}
      </div>
      <div className="flex-1 md:flex-initial">
        {hasNext && (
          <PageButton className="btn-block" onClick={onClickNextPage} disabled={!hasNext}>
            <ChevronLeftIcon className="rotate-180" />
          </PageButton>
        )}
      </div>
    </div>
  );
}

export default PaginationButtons;
