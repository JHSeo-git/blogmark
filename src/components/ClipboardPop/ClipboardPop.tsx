'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import useClipboardPop from '@/hooks/useClipboardPop';

import CloseIcon from '../__icons/Close.Icon';

function ClipboardPop() {
  const { isPop, onClose, text } = useClipboardPop();
  const router = useRouter();

  const onClick = () => {
    onClose();

    if (!text) {
      return;
    }

    router.push(`/items/new?markUrl=${encodeURIComponent(text)}`);
  };

  return (
    <AnimatePresence>
      {isPop && (
        <motion.div
          key="clipboard-pop"
          className="fixed bottom-0 left-1/2 z-50 p-2 md:p-6 w-full max-w-xl"
          initial={{ opacity: 0, x: '-50%', y: 50 }}
          animate={{ opacity: 1, x: '-50%', y: 0 }}
          exit={{ opacity: 0, x: '-50%', y: 50, transition: { ease: 'easeIn', duration: 0.15 } }}
        >
          <div className="p-6 bg-base-100 rounded-xl shadow-2xl">
            <div className="pl-1 flex items-center justify-between">
              <h4 className="text-lg font-bold text-neutral">Could you BlogMark copy url?</h4>
              <button
                type="button"
                className="p-2 bg-base-200 rounded-lg hover:bg-base-300 transition-all"
                onClick={onClose}
              >
                <CloseIcon width={16} height={16} />
              </button>
            </div>
            <p className="mt-2 pl-1 break-all truncate">{text}</p>
            <button
              type="button"
              onClick={onClick}
              className="mt-4 btn w-full btn-primary no-animation active:bg-primary text-base md:w-auto font-bold"
            >
              GO MARK
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ClipboardPop;
