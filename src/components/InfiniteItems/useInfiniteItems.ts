import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getItems } from '@/lib/api/items';

export function useInfiniteItems() {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['infinite-items'],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getItems({ page: pageParam });

      return data;
    },
    getNextPageParam: (lastPage) => lastPage.pageInfo?.nextPage,
  });

  const items = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.pages.flatMap((page) => page.items);
  }, [data]);

  return {
    items,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
}
