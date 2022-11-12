import Card from '@/components/Card';
import Hidden from '@/components/Hidden';
import itemService from '@/services/item.service';

async function getItems() {
  const items = await itemService.getItems();

  return items;
}

async function HomePage() {
  const {
    items,
    pageInfo: { nextCursor, hasNextPage },
  } = await getItems();

  return (
    <>
      <Hidden>
        <h1>Home Page</h1>
      </Hidden>
      <div className="flex items-center justify-center">{/* TODO: tabs */}</div>
      <ul className="p-4 pb-10 grid grid-cols-1 gap-10 md:p-6 md:grid-cols-2 xl:grid-cols-3">
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
        {hasNextPage && nextCursor && <div>더 있어유</div>}
      </ul>
    </>
  );
}

export default HomePage;
