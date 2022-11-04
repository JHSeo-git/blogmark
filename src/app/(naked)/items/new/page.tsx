import { redirect } from 'next/navigation';

import FolderHeartIcon from '@/components/__icons/FolderHeart.Icon';
import NewItemForm from '@/components/NewItemForm';
import { getUser } from '@/lib/session';

async function NewPage() {
  const user = await getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <section className="px-8 flex flex-col items-center space-y-2">
      <FolderHeartIcon />
      <h1 className="mt-2 font-bold text-lg">
        Register new <span className="text-primary">Blogmark</span>
      </h1>
      <div className="w-full">
        <div className="h-6" />
        <NewItemForm />
      </div>
    </section>
  );
}

export default NewPage;
