'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import { getItems } from '@/lib/api/items';

import Card, { CardSkeleton } from '../Card';

function InfiniteItems() {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['infinite-items'],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getItems({ page: pageParam });

      return data;
    },
    getNextPageParam: (lastPage) => lastPage.pageInfo.nextPage,
  });

  const items = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.pages.flatMap((page) => page.items);
  }, [data]);

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
          {items.map((item) => (
            <li key={item.id}>
              <Card
                title={item.title}
                content={item.description}
                thumbnail={item.thumbnail}
                date={item.createdAt}
                author={item.userName}
                favicon={item.favicon}
                publisher={item.publisher}
              />
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
