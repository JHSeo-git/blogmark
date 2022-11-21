import Loading from '@/app/(auth)/login/loading';

function ItemsLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Loading />
    </div>
  );
}

export default ItemsLoading;
