'use client';

import { AnimatePresence, motion } from 'framer-motion';

import useClipboardReady from '@/hooks/useClipboardReady';

function ClipboardPop() {
  const { ready, text } = useClipboardReady();

  return (
    <AnimatePresence>
      {ready && (
        <motion.div
          className="fixed left-0 right-0 bottom-0 p-6 z-50"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
        >
          <div className="p-3 bg-base-100 rounded-xl shadow-2xl text-center">
            <h4 className="text-lg font-bold">Could you BlogMark copy url?</h4>
            <p className="pt-1">{text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ClipboardPop;
