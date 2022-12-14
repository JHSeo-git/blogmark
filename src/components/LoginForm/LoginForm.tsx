'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import type { Provider } from '@/types/oauth-provider';

import GithubIcon from '../__icons/Github.Icon';
import GoogleIcon from '../__icons/Google.Icon';
import LoadingIcon from '../__icons/Loading.Icon';

interface LoginFormProps {
  enableCallbackUrl?: boolean;
}

function LoginForm({ enableCallbackUrl = true }: LoginFormProps) {
  const [loadingStatus, setLoadingStatus] = useState<Record<Provider, boolean>>({
    github: false,
    google: false,
  });
  const searchParams = useSearchParams();

  const onLogin = async (provider: Provider) => {
    try {
      setLoadingStatus((prev) => ({ ...prev, [provider]: true }));
      // The redirect option is only available for credentials and email providers.
      await signIn(provider, {
        callbackUrl: enableCallbackUrl ? searchParams.get('from') ?? '/' : '/',
      });
    } catch (e) {
      // only reset the state when occurs error
      // because the page will be redirected
      setLoadingStatus((prev) => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => onLogin('github')}
        className={cn(
          'relative inline-flex gap-2 w-full items-center justify-center rounded-lg border px-5 py-2.5 text-center text-sm',
          'bg-base-100 hover:bg-base-200 focus:outline-none focus:ring-1 focus:ring-primary transition-all disabled:opacity-40 disabled:hover:bg-base-100',
        )}
        disabled={loadingStatus.github}
      >
        <GithubIcon width={20} height={20} />
        <span className="font-bold">Sign in with Github</span>
        <AnimatePresence>
          {loadingStatus.github && (
            <motion.span
              key="loginform-github-loading"
              className="absolute right-4 top-[50%] -translate-y-1/2 inline-flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingIcon width={18} height={18} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
      <button
        type="button"
        onClick={() => onLogin('google')}
        className={cn(
          'mt-2 relative inline-flex gap-2 w-full items-center justify-center rounded-lg border px-5 py-2.5 text-center text-sm',
          'bg-base-100 hover:bg-base-200 focus:outline-none focus:ring-1 focus:ring-primary transition-all disabled:opacity-40 disabled:hover:bg-base-100',
        )}
        disabled={loadingStatus.google}
      >
        <GoogleIcon width={20} height={20} />
        <span className="font-bold">Sign in with Google</span>
        <AnimatePresence>
          {loadingStatus.google && (
            <motion.span
              key="loginform-google-loading"
              className="absolute right-4 top-[50%] -translate-y-1/2 inline-flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingIcon width={18} height={18} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </>
  );
}

export default LoginForm;
