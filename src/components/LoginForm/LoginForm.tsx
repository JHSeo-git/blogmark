'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import GithubIcon from '../__icons/Github.Icon';

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const onClickGithub = async () => {
    try {
      setIsLoading(true);
      // The redirect option is only available for credentials and email providers.
      await signIn('github', {
        callbackUrl: searchParams.get('from') ?? '/',
      });
    } catch (e) {
      // only reset the state when occurs error
      // because the page will be redirected
      setIsLoading(false);
    }
  };

  return (
    <section className="w-72">
      <button
        type="button"
        onClick={onClickGithub}
        className="inline-flex gap-2 w-full items-center justify-center rounded-lg border bg-white px-5 py-2.5 text-center text-sm text-base-content hover:bg-base-200 focus:outline-none focus:ring-1 focus:ring-primary transition-all disabled:opacity-40"
        disabled={isLoading}
      >
        <GithubIcon width={20} height={20} />
        <span className="font-bold">Github</span>
      </button>
    </section>
  );
}

export default LoginForm;
