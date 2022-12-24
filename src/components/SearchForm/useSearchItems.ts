import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { searchItems } from '@/lib/api/search';

export function useSearchItems({ query }: { query: string }) {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['search', query],
      queryFn: async ({ pageParam = 0 }) => {
        const data = await searchItems({ query, page: pageParam });

        return data;
      },
      getNextPageParam: (lastPage) => lastPage?.pageInfo?.nextPage,
      enabled: !!query,
    });

  const items = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.pages.flatMap((page) => page.items);
  }, [data]);

  return {
    searchItem: refetch,
    items,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
}
