import { useState } from 'react';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export default function useWindowFocus() {
  const [focused, setFocus] = useState(false);
  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);

  useIsomorphicLayoutEffect(() => {
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return focused;
}
