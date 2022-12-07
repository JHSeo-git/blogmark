import ClipboardPop from '@/components/ClipboardPop';
import Hidden from '@/components/Hidden';
import InfiniteItems from '@/components/InfiniteItems';
import { getUser } from '@/lib/session';

async function ItemsPage() {
  const user = await getUser();

  return (
    <>
      <Hidden>
        <h1>Items Page</h1>
      </Hidden>
      <InfiniteItems />
      {user && <ClipboardPop />}
    </>
  );
}

export default ItemsPage;
