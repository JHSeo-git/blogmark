import Card from '@/components/Card';
import Hidden from '@/components/Hidden';
import { getItems } from '@/lib/api/items';

async function HomePage() {
  const { data } = await getItems();

  let currentDate: string | undefined;

  return (
    <>
      <Hidden>
        <h1>Home Page</h1>
      </Hidden>
      <div className="flex items-center justify-center">{/* TODO: tabs */}</div>
      <ul className="p-4 pb-10 grid grid-cols-1 gap-10">
        {data.map((item) => {
          const dateDivider =
            !currentDate || currentDate !== item.createDate ? (
              <div className="divider">
                <span className="text-sm font-bold text-gray-500">{item.createDate}</span>
              </div>
            ) : null;

          currentDate = item.createDate;

          return (
            <li key={item.id}>
              {dateDivider}
              <Card
                title={item.title}
                content={item.description ?? undefined}
                thumbnail={item.thumbnail ?? undefined}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default HomePage;
