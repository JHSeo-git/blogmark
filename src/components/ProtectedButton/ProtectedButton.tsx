'use client';

import { useSession } from 'next-auth/react';

import SignInDialogButton from '../SignInDialogButton';

export type ProtectedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function ProtectedButton({ children, type = 'button', className, ...rest }: ProtectedButtonProps) {
  const session = useSession();

  if (session.status !== 'authenticated') {
    return <SignInDialogButton>{children}</SignInDialogButton>;
  }

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={className} {...rest}>
      {children}
    </button>
  );
}

export default ProtectedButton;
