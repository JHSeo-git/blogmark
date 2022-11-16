import Card from '@/components/Card';
import Hidden from '@/components/Hidden';
import { paginationSchema } from '@/lib/schema';
import itemService from '@/services/item.service';

import PaginationButtons from './components/PaginationButtons';

async function getItems({ page }: { page?: string }) {
  const { page: pageNumber } = await paginationSchema.validate({ page });

  const items = await itemService.getPaginationItems({ page: pageNumber });

  return items;
}

interface PageProps {
  searchParams: { page?: string };
}
async function HomePage({ searchParams }: PageProps) {
  const data = await getItems({ page: searchParams.page });

  if (!data) {
    return null;
  }

  const {
    items,
    pageInfo: { total, nextPage, currentPage },
  } = data;

  if (items.length === 0) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold">Sorry, there is nothing.</h1>
      </div>
    );
  }

  return (
    <>
      <Hidden>
        <h1>Home Page</h1>
      </Hidden>
      <ul className="p-4 pb-12 grid grid-cols-1 gap-10 md:p-6 md:grid-cols-2 xl:grid-cols-3">
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
        {/* {hasNextPage && nextCursor && <PaginationItems cursor={nextCursor} />} */}
      </ul>
      <PaginationButtons currentPage={currentPage} nextPage={nextPage} />
    </>
  );
}

export default HomePage;
