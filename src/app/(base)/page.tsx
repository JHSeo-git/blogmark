import Card from '@/components/Card';
import { getItems } from '@/lib/api/items';

async function HomePage() {
  const { data } = await getItems();

  return (
    <>
      <h1>Home Page</h1>
      <ul className="p-4 space-y-6">
        {data.map((item) => (
          <li key={item.id}>
            <Card
              title={item.title}
              content={item.description ?? undefined}
              thumbnail={item.thumbnail ?? undefined}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default HomePage;
