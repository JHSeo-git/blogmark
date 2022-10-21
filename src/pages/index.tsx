import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';

import Layout from '@/components/Layout';

const Home: NextPage = () => {
  const onClick = () => {
    signIn('github');
  };

  return (
    <Layout>
      <button type="button" onClick={onClick}>
        github login
      </button>
    </Layout>
  );
};

export default Home;
