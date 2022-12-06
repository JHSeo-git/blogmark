'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import GithubIcon from '../__icons/Github.Icon';
import GoogleIcon from '../__icons/Google.Icon';

interface LoginFormProps {
  enableCallbackUrl?: boolean;
}

function LoginForm({ enableCallbackUrl = true }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const onLogin = async (provider: 'github' | 'google') => {
    try {
      setIsLoading(true);
      // The redirect option is only available for credentials and email providers.
      await signIn(provider, {
        callbackUrl: enableCallbackUrl ? searchParams.get('from') ?? '/' : '/',
      });
    } catch (e) {
      // only reset the state when occurs error
      // because the page will be redirected
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => onLogin('github')}
        className={cn(
          'inline-flex gap-2 w-full items-center justify-center rounded-lg border px-5 py-2.5 text-center text-sm',
          'bg-base-100 hover:bg-base-200 focus:outline-none focus:ring-1 focus:ring-primary transition-all disabled:opacity-40 disabled:hover:bg-base-100',
        )}
        disabled={isLoading}
      >
        <GithubIcon width={20} height={20} />
        <span className="font-bold">Github</span>
      </button>
      <button
        type="button"
        onClick={() => onLogin('google')}
        className={cn(
          'mt-2 inline-flex gap-2 w-full items-center justify-center rounded-lg border px-5 py-2.5 text-center text-sm',
          'bg-base-100 hover:bg-base-200 focus:outline-none focus:ring-1 focus:ring-primary transition-all disabled:opacity-40 disabled:hover:bg-base-100',
        )}
        disabled={isLoading}
      >
        <GoogleIcon width={20} height={20} />
        <span className="font-bold">Google</span>
      </button>
    </>
  );
}

export default LoginForm;
