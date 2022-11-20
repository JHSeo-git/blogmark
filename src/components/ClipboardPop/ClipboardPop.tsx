'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import useClipboardReady from '@/hooks/useClipboardReady';

function ClipboardPop() {
  const { ready, text } = useClipboardReady();
  const router = useRouter();

  const onClick = () => {
    if (!text) {
      return;
    }

    router.push(`/items/new?markUrl=${encodeURIComponent(text)}`);
  };

  return (
    <AnimatePresence>
      {ready && (
        <motion.div
          className="fixed bottom-0 p-6 z-50 left-1/2 w-full max-w-xl"
          initial={{ opacity: 0, x: '-50%', y: 100 }}
          animate={{ opacity: 1, x: '-50%', y: 0 }}
          exit={{ opacity: 0, x: '-50%', y: 100 }}
        >
          <div className="p-4 bg-base-100 rounded-xl shadow-2xl text-center">
            <h4 className="text-lg font-bold">Could you BlogMark copy url?</h4>
            <p className="break-all truncate">{text}</p>
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
