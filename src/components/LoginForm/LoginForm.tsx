'use client';

import { signIn } from 'next-auth/react';

import GithubIcon from '../__icons/Github.icon';

function LoginForm() {
  const onSubmit = () => {
    signIn('github');
  };

  return (
    <form onSubmit={onSubmit} className="w-72">
      <button
        type="submit"
        className="inline-flex gap-2 w-full items-center justify-center rounded-lg border bg-white px-5 py-2.5 text-center text-sm text-base-content hover:bg-base-200 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
      >
        <GithubIcon width={20} height={20} />
        <span className="font-bold">Github</span>
      </button>
    </form>
  );
}

export default LoginForm;
