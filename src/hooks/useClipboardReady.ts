import { useCallback, useRef, useState } from 'react';
import * as yup from 'yup';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import useWindowFocus from './useWindowFocus';

type ClipboardType = 'url' | 'text';

interface UseClipboardReadyProps {
  timeOut?: number;
  type?: ClipboardType;
}

const validator: Record<ClipboardType, yup.StringSchema> = {
  url: yup.string().url(),
  text: yup.string(),
};

export default function useClipboardReady({
  timeOut = 15000,
  type = 'url',
}: UseClipboardReadyProps = {}) {
  const focused = useWindowFocus();
  const firstActionRef = useRef(true);
  const [ready, setReady] = useState(false);
  const [text, setText] = useState<string | undefined>();

  const handleClipboardReady = useCallback(async () => {
    let timer: NodeJS.Timeout | undefined;
    const clipboardText = await navigator.clipboard.readText();

    if (clipboardText) {
      const isValid = await validator[type].isValid(clipboardText);

      if (firstActionRef.current && isValid) {
        firstActionRef.current = false;
        setReady(true);
        setText(clipboardText);

        timer = setTimeout(() => {
          setReady(false);
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

  return { ready, text };
}
