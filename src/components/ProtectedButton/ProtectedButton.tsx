'use client';

import { useSession } from 'next-auth/react';
import { forwardRef } from 'react';

import SignInDialogButton from '../SignInDialogButton';

export type ProtectedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const ProtectedButton = forwardRef<HTMLButtonElement, ProtectedButtonProps>(
  ({ children, type = 'button', className, ...rest }, forwardedRef) => {
    const session = useSession();

    if (session.status !== 'authenticated') {
      return <SignInDialogButton>{children}</SignInDialogButton>;
    }

    return (
      // eslint-disable-next-line react/button-has-type
      <button ref={forwardedRef} type={type} className={className} {...rest}>
        {children}
      </button>
    );
  },
);

export default ProtectedButton;
