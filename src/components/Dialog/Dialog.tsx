'use client';

import * as PrimitiveDialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/utils';

import CloseIcon from '../__icons/Close.Icon';
import { contentScale, overlayDefault } from './Dialog.constants';

export function Root({ children, ...rest }: PrimitiveDialog.DialogProps) {
  return <PrimitiveDialog.Root {...rest}>{children}</PrimitiveDialog.Root>;
}

export function Trigger({ children, ...rest }: PrimitiveDialog.DialogTriggerProps) {
  return <PrimitiveDialog.Trigger {...rest}>{children}</PrimitiveDialog.Trigger>;
}

export function Content({
  isOpen = true,
  children,
  className,
  ...rest
}: PrimitiveDialog.DialogContentProps & { isOpen?: boolean }) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <PrimitiveDialog.Overlay forceMount asChild>
            <motion.div
              key="overlay"
              className="bg-black/50 fixed inset-0 z-[99]"
              {...overlayDefault}
            />
          </PrimitiveDialog.Overlay>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <PrimitiveDialog.Content forceMount asChild {...rest}>
            <motion.div
              key="content"
              className={cn(
                'fixed z-[99] bg-base-100',
                'w-full rounded-lg p-4',
                'top-[50%] left-[50%]',
                className,
              )}
              // {...contentDefault}
              {...contentScale}
            >
              {children}
            </motion.div>
          </PrimitiveDialog.Content>
        )}
      </AnimatePresence>
    </>
  );
}

export function Title({ children, ...rest }: PrimitiveDialog.DialogTitleProps) {
  return (
    <PrimitiveDialog.Title asChild {...rest}>
      <div className="flex justify-between items-center">
        <>
          {typeof children === 'string' ? <h2>{children}</h2> : { children }}
          <PrimitiveDialog.Close className="p-1 inline-flex items-center justify-center">
            <CloseIcon className="text-gray-500 hover:text-gray-700 transition-all" />
          </PrimitiveDialog.Close>
        </>
      </div>
    </PrimitiveDialog.Title>
  );
}
