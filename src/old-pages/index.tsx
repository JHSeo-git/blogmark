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
      <p className="py-10">github login</p>
      <p className="py-10">github login</p>
      <p className="py-10">github login</p>
      <p className="py-10">github login</p>
      <p className="py-10">github login</p>
      <p className="py-10">github login</p>
    </Layout>
  );
};

export default Home;
