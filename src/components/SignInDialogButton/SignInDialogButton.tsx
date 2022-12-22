'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import FolderHeartIcon from '../__icons/FolderHeart.Icon';
import * as Dialog from '../Dialog';
import LoginForm from '../LoginForm';

interface SignInDialogButtonProps {
  children: React.ReactNode;
}

function SignInDialogButton({ children }: SignInDialogButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button type="button" onClick={() => setIsOpen(true)}>
          <motion.span
            className="text-sm text-primary font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.span>
        </button>
      </Dialog.Trigger>
      <Dialog.Content className="max-w-sm" isOpen={isOpen}>
        <Dialog.Title>로그인</Dialog.Title>
        <div className="mt-4 mb-2 flex flex-col items-center">
          <FolderHeartIcon />
          <h3 className="mt-2 font-bold text-xl">Blogmark</h3>
          <p className="text-sm">Enjoy marking a blog!</p>
          <div className="mt-4 w-full">
            <LoginForm enableCallbackUrl={false} />
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default SignInDialogButton;
