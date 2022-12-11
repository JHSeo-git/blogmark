import * as PrimitiveDialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/utils';

import CloseIcon from '../__icons/Close.Icon';

export function Root({ children, ...rest }: PrimitiveDialog.DialogProps) {
  return (
    <PrimitiveDialog.Root {...rest}>
      <AnimatePresence>
        <>{children}</>
        {/* {children} */}
      </AnimatePresence>
    </PrimitiveDialog.Root>
  );
}

export function Trigger({ children, ...rest }: PrimitiveDialog.DialogTriggerProps) {
  return <PrimitiveDialog.Trigger {...rest}>{children}</PrimitiveDialog.Trigger>;
}

export function Content({ children, ...rest }: PrimitiveDialog.DialogContentProps) {
  return (
    <PrimitiveDialog.Portal>
      <PrimitiveDialog.Overlay asChild>
        <motion.div
          className="bg-black/50 fixed inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      </PrimitiveDialog.Overlay>
      <PrimitiveDialog.Content asChild {...rest}>
        <motion.div
          className={cn(
            'fixed z-50 bg-base-100',
            'w-[95vw] max-w-sm rounded-lg p-4 md:w-full',
            'top-[50%] left-[50%]',
          )}
          initial={{ opacity: 0, y: 100, x: '-50%' }}
          animate={{ opacity: 1, y: '-50%', x: '-50%' }}
          exit={{ opacity: 0, y: 100, x: '-50%' }}
        >
          {children}
        </motion.div>
      </PrimitiveDialog.Content>
    </PrimitiveDialog.Portal>
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