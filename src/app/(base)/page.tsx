import { getItems } from '@/lib/api/items';

async function HomePage() {
  const { data } = await getItems();

  return (
    <>
      <h1>Home Page</h1>
      {data.map((item) => (
        <p key={item.id}>{JSON.stringify(item, null, 2)}</p>
      ))}
    </>
  );
}

export default HomePage;
