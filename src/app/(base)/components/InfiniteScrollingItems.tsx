'use client';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import Card from '@/components/Card';
import { getItems } from '@/lib/api/items';

export interface PaginationItemsProps {
  cursor: number;
}

const queryClient = new QueryClient();

function PaginationItemsChildren({ cursor }: PaginationItemsProps) {
  // const [currentCursor, setCurrentCursor] = useState(cursor);
  const { data, isLoading, error } = useQuery({
    queryKey: ['items', cursor],
    queryFn: () => getItems({ cursor }),
  });

  if (!data || isLoading) {
    return <div>로딩중</div>;
  }

  if (error) {
    return <div>에러</div>;
  }

  console.log(data);

  return (
    <>
      {data.items.map((item) => (
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
      {/* <button type="button" onClick={() => setCurrentCursor(data.pageInfo.nextCursor)}>
        더보기
      </button> */}
    </>
  );
}

function PaginationItems(props: PaginationItemsProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PaginationItemsChildren {...props} />
    </QueryClientProvider>
  );
}

export default PaginationItems;
