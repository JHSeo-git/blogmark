'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import LoadingIcon from '../__icons/Loading.Icon';

export interface SignInButtonProps {
  className?: string;
}

function SignInButton({ className }: SignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const onSignInClick = async () => {
    try {
      setIsLoading(true);
      // The redirect option is only available for credentials and email providers.
      await signIn('github');
    } catch (e) {
      // only reset the state when occurs error
      // because the page will be redirected
      setIsLoading(false);
    }
  };

  return (
    <button type="button" className={className} onClick={onSignInClick} disabled={isLoading}>
      <AnimatePresence>
        {isLoading ? (
          <span className="flex items-center justify-center text-primary px-2">
            <LoadingIcon width={16} height={16} />
          </span>
        ) : (
          <motion.span
            className="text-sm text-primary font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            로그인
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default SignInButton;
