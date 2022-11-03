import { redirect } from 'next/navigation';

import NewItemForm from '@/components/NewItemForm';
import { getUser } from '@/lib/session';

async function NewPage() {
  const user = await getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <section className="px-8 py-4">
      <NewItemForm />
    </section>
  );
}

export default NewPage;
