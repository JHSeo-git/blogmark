'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import CloseIcon from '../__icons/Close.Icon';
import FolderHeartIcon from '../__icons/FolderHeart.Icon';
import GithubIcon from '../__icons/Github.Icon';
import LoginForm from '../LoginForm';

function SignInDialogButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickGithub = async () => {
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
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <AnimatePresence>
        <>
          <Dialog.Trigger asChild>
            <button type="button" onClick={() => setIsOpen(true)}>
              <motion.span
                className="text-sm text-primary font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                로그인
              </motion.span>
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay asChild>
              <motion.div
                className="bg-black/50 fixed inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content
              className={cn(
                'fixed z-50 bg-base-100',
                'w-[95vw] max-w-sm rounded-lg p-4 md:w-full',
                'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
              )}
            >
              <Dialog.Title asChild>
                <div className="flex justify-between items-center">
                  <h2>로그인</h2>
                  <Dialog.Close className="p-1 inline-flex items-center justify-center">
                    <CloseIcon className="text-gray-500 hover:text-gray-700 transition-all" />
                  </Dialog.Close>
                </div>
              </Dialog.Title>
              <div className="mt-4 mb-2 flex flex-col items-center">
                <FolderHeartIcon />
                <h3 className="mt-2 font-bold text-xl">Blogmark</h3>
                <p className="text-sm">Enjoy marking a blog!</p>
                <div className="mt-4 w-full">
                  <LoginForm enableCallbackUrl={false} />
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </>
      </AnimatePresence>
    </Dialog.Root>
  );
}

export default SignInDialogButton;
