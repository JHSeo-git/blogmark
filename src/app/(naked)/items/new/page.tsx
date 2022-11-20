import { redirect } from 'next/navigation';

import FolderHeartIcon from '@/components/__icons/FolderHeart.Icon';
import NewItemForm from '@/components/NewItemForm';
import { loginUrl } from '@/lib/auth';
import { urlSchema } from '@/lib/schema';
import { getUser } from '@/lib/session';

interface NewPageProps {
  searchParams: { markUrl?: string };
}

async function NewPage({ searchParams }: NewPageProps) {
  let initialUrl: string | undefined;

  if (searchParams.markUrl) {
    initialUrl = decodeURIComponent(searchParams.markUrl);

    const isValidUrl = await urlSchema.isValid(initialUrl);

    if (!isValidUrl) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold">Not valid url.</h1>
          <p>{initialUrl}</p>
        </div>
      );
    }
  }

  const user = await getUser();

  if (!user) {
    return redirect(loginUrl);
  }

  return (
    <section className="my-6 max-w-lg mx-auto px-8 flex flex-col items-center space-y-2 md:my-12">
      <FolderHeartIcon />
      <h1 className="mt-2 font-bold text-xl">
        Register new <span className="text-primary">Blogmark</span>
      </h1>
      <div className="w-full">
        <div className="h-6" />
        <NewItemForm initialUrl={initialUrl} />
      </div>
    </section>
  );
}

export default NewPage;
