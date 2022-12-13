import { nanoid } from 'nanoid';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import * as Toast from './Toast';

interface ToastOption {
  duration?: number;
}
interface ToastInfo {
  title: string;
  description: string;
}

type Add = (info: ToastInfo & ToastOption) => string;

interface ContextProps {
  add: Add;
  clear: (toastId: string) => void;
  clearAll: () => void;
}

const Context = createContext<ContextProps>({
  add: () => '',
  clear: () => {},
  clearAll: () => {},
});

export function ToastContextProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<(ToastInfo & { id: string; visible?: boolean })[]>([]);

  const add = useCallback<Add>(
    (info) => {
      const id = nanoid();
      setToasts((prev) => [...prev, { ...info, id, visible: true }]);

      return id;
    },
    [setToasts],
  );

  const clear = useCallback(
    (id: string) => {
      const toast = toasts.find((item) => item.id === id);

      if (!toast) {
        return;
      }

      setToasts((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return { ...item, visible: false };
          }
          return item;
        }),
      );

      setTimeout(() => {
        setToasts((prev) => [...prev.filter((item) => item.id !== id)]);
      }, 200);
    },
    [setToasts, toasts],
  );

  const clearAll = useCallback(() => {
    setToasts((prev) => prev.map((item) => ({ ...item, visible: false })));

    setTimeout(() => {
      setToasts([]);
    }, 200);
  }, [setToasts]);

  const value = useMemo<ContextProps>(
    () => ({
      add,
      clear,
      clearAll,
    }),
    [add, clear, clearAll],
  );

  return (
    <Context.Provider value={value}>
      <Toast.Provider>
        {children}
        {toasts.map(({ id, visible, ...rest }) => (
          <Toast.BaseToast
            key={id}
            open={visible ?? true}
            onOpenChange={() => clear(id)}
            {...rest}
          />
        ))}
      </Toast.Provider>
    </Context.Provider>
  );
}

export function useToast() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useToast must be used within a ToastContextProvider');
  }

  return context;
}
