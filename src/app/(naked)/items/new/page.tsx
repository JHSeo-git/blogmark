import { redirect } from 'next/navigation';

import NewItemForm from '@/components/NewItemForm';
import { getSession } from '@/lib/session';

const getUser = async () => {
  const session = await getSession();

  return session?.user;
};

async function NewPage() {
  const user = await getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <section className="p-6">
      <NewItemForm />
    </section>
  );
}

export default NewPage;
