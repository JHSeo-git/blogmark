import { useIsomorphicLayoutEffect } from 'framer-motion';

export default function useLockedElementByIdEffect(id: string, hidden = false) {
  useIsomorphicLayoutEffect(() => {
    const element = document.getElementById(id);

    if (hidden && element) {
      element.style.overflow = 'hidden';
    }

    return () => {
      if (element) {
        element.style.overflow = '';
      }
    };
  }, [id, hidden]);
}
