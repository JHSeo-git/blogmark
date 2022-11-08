import Card from '@/components/Card';
import Hidden from '@/components/Hidden';
import { getItems } from '@/lib/api/items';

async function HomePage() {
  const { data } = await getItems();

  return (
    <>
      <Hidden>
        <h1>Home Page</h1>
      </Hidden>
      <div className="flex items-center justify-center">{/* TODO: tabs */}</div>
      <ul className="p-4 pb-10 grid grid-cols-1 gap-10 md:p-6 md:grid-cols-2 xl:grid-cols-3">
        {data.map((item) => (
          <li key={item.id}>
            <Card
              title={item.title}
              content={item.description ?? undefined}
              thumbnail={item.thumbnail ?? undefined}
              date={item.createDate}
              author={item.userName ?? undefined}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default HomePage;
