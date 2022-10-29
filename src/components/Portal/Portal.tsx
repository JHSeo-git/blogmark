/**
 * @see https://dev.to/link2twenty/react-using-portals-to-make-a-modal-2kdf
 */
import React from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  parent?: HTMLElement;
  className?: string;
  children: React.ReactNode;
}
export default function Portal({ children, parent, className }: PortalProps) {
  const el = React.useMemo(() => {
    if (typeof document === 'undefined') {
      return null;
    }
    return document.createElement('div');
  }, []);

  React.useEffect(() => {
    if (!el) {
      return;
    }

    const target = parent || document.body;
    const classList: string[] = [];

    if (className) {
      className.split(' ').forEach((item) => classList.push(item));
    }

    classList.forEach((item) => item && el.classList.add(item));
    target.appendChild(el);

    return () => {
      target.removeChild(el);
    };
  }, [el, parent, className]);

  if (!el) {
    return null;
  }

  return ReactDOM.createPortal(children, el);
}