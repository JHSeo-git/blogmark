'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Card, { CardSkeleton } from '../Card';
import { useInfiniteItems } from './useInfiniteItems';

function InfiniteItems() {
  const { ref, inView } = useInView();

  const { items, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteItems();

  useEffect(() => {
    if (!inView) return;
    if (!hasNextPage) return;
    if (!fetchNextPage) return;

    fetchNextPage();
  }, [inView, fetchNextPage, hasNextPage]);

  if (!isFetchingNextPage && isFetching) {
    return (
      <ul className="p-4 pb-12 grid grid-cols-1 gap-10 md:p-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={`Initial_CardSkeleton_${idx}`}>
            <CardSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      {items.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center h-full">
          <h2 className="text-2xl font-bold">Sorry, there is nothing yet.</h2>
        </div>
      ) : (
        <ul className="p-4 pb-12 grid grid-cols-1 gap-10 md:p-6 md:pb-12 md:grid-cols-2 xl:grid-cols-3">
          {items.filter(Boolean).map((item) => (
            <li key={item.id}>
              <Card item={item} />
            </li>
          ))}
          {hasNextPage && (
            <>
              <li ref={ref}>
                <CardSkeleton />
              </li>
              <li>
                <CardSkeleton />
              </li>
              <li className="hidden xl:block">
                <CardSkeleton />
              </li>
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default InfiniteItems;
