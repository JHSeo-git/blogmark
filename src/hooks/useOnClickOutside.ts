import type { RefObject } from 'react';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

type AnyEvent = MouseEvent | TouchEvent;

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: AnyEvent) => void,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
) {
  useIsomorphicLayoutEffect(() => {
    const listener = (event: AnyEvent) => {
      const el = ref?.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(mouseEvent, listener);
    // document.addEventListener(`touchstart`, listener);

    return () => {
      document.removeEventListener(mouseEvent, listener);
      // document.removeEventListener(`touchstart`, listener);
    };

    // Reload only if ref or handler changes
  }, [ref, handler, mouseEvent]);
}

export default useOnClickOutside;
