import ClipboardPop from '@/components/ClipboardPop';
import Hidden from '@/components/Hidden';
import InfiniteItems from '@/components/InfiniteItems';

async function ItemsPage() {
  return (
    <>
      <Hidden>
        <h1>Items Page</h1>
      </Hidden>
      <InfiniteItems />
      <ClipboardPop />
    </>
  );
}

export default ItemsPage;
