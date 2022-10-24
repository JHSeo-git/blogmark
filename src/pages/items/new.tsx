import Layout from '@/components/Layout';

import type { ProtectedNextPage } from '../_app';

const ItemsNew: ProtectedNextPage = () => {
  return <Layout naked>NEw</Layout>;
};

ItemsNew.protected = true;

export default ItemsNew;
