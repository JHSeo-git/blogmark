'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button type="button" className={className} onClick={onSignInClick} disabled={isLoading}>
      {isLoading ? '...loading' : '로그인'}
    </button>
  );
}

export default SignInButton;
