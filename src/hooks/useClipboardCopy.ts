import { useCallback, useEffect, useState } from 'react';

export default function useClipboardCopy(timeout = 5000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  }, []);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [copied, timeout]);

  return {
    copied,
    copy,
  };
}
