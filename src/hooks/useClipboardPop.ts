import { useCallback, useRef, useState } from 'react';
import { z } from 'zod';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import useWindowFocus from './useWindowFocus';

type ClipboardType = 'url' | 'text';

interface UseClipboardReadyProps {
  timeOut?: number;
  type?: ClipboardType;
}

const validator: Record<ClipboardType, z.ZodString> = {
  url: z.string().url(),
  text: z.string(),
};

export default function useClipboardPop({
  timeOut = 15000,
  type = 'url',
}: UseClipboardReadyProps = {}) {
  const focused = useWindowFocus();
  const firstActionRef = useRef(true);
  const [isPop, setIsPop] = useState(false);
  const [text, setText] = useState<string | undefined>();

  const onClose = useCallback(() => {
    setIsPop(false);
  }, []);

  const handleClipboardReady = useCallback(async () => {
    let timer: NodeJS.Timeout | undefined;
    const clipboardText = await navigator.clipboard.readText();

    if (clipboardText) {
      const isValid = await validator[type].safeParse(clipboardText);

      if (firstActionRef.current && isValid.success) {
        firstActionRef.current = false;
        setIsPop(true);
        setText(clipboardText);

        timer = setTimeout(() => {
          setIsPop(false);
        }, timeOut);
      }
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timeOut, type]);

  useIsomorphicLayoutEffect(() => {
    if (focused) {
      handleClipboardReady();
    }
  }, [focused, handleClipboardReady]);

  return { isPop, onClose, text };
}
