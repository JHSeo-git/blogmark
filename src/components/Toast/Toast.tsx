import * as PrimitiveToast from '@radix-ui/react-toast';

import { cn } from '@/lib/utils';

import CloseIcon from '../__icons/Close.Icon';

export function Provider({ children, ...rest }: PrimitiveToast.ToastProviderProps) {
  return (
    <PrimitiveToast.Provider {...rest}>
      {children}
      <PrimitiveToast.Viewport
        className={cn(
          'fixed bottom-0 right-0 left-0',
          'flex flex-col gap-4 m-0 p-4 list-none z-[99] outline-none max-w-[100vw]',
        )}
      />
    </PrimitiveToast.Provider>
  );
}

export function Root({ className, ...rest }: PrimitiveToast.ToastProps) {
  return (
    <PrimitiveToast.Root
      {...rest}
      className={cn(
        'w-auto md:w-full md:ml-auto md:max-w-sm shadow-xl rounded-lg',
        'bg-base-100',
        'radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right',
        'radix-state-closed:animate-toast-hide',
        'radix-swipe-end:animate-toast-swipe-out',
        'translate-x-radix-toast-swipe-move-x',
        'radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]',
        'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
        className,
      )}
    />
  );
}

export function Title({ children, ...rest }: PrimitiveToast.ToastTitleProps) {
  return (
    <PrimitiveToast.Title {...rest}>
      {typeof children === 'string' ? (
        <strong className="text-base font-bold">{children}</strong>
      ) : (
        children
      )}
    </PrimitiveToast.Title>
  );
}

export function Description({ children, ...rest }: PrimitiveToast.ToastDescriptionProps) {
  return (
    <PrimitiveToast.Description {...rest}>
      {typeof children === 'string' ? (
        <strong className="text-sm text-gray-700 dark:text-gray-500">{children}</strong>
      ) : (
        children
      )}
    </PrimitiveToast.Description>
  );
}

export function Action({ children, ...rest }: PrimitiveToast.ToastActionProps) {
  return <PrimitiveToast.Action {...rest}>{children}</PrimitiveToast.Action>;
}

export function Close({ children, ...rest }: PrimitiveToast.ToastCloseProps) {
  return (
    <PrimitiveToast.Close aria-label={rest['aria-label'] || 'Close'} {...rest}>
      {children}
    </PrimitiveToast.Close>
  );
}

interface BasicToastProps extends PrimitiveToast.ToastProps {
  title: string;
  description: string;
}
export function BaseToast({ title, description, duration = 5000, ...rest }: BasicToastProps) {
  return (
    <Root duration={duration} {...rest}>
      <div className="flex">
        <div className="w-0 flex-1 flex items-center pl-5 py-4">
          <div className="w-full radix">
            <Title>{title}</Title>
            <Description>{description}</Description>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col px-3 py-3">
            <Close className="rounded-lg p-1 flex items-center justify-center bg-base-100 hover:bg-base-200 transition-all">
              <CloseIcon width={20} height={20} />
            </Close>
          </div>
        </div>
      </div>
    </Root>
  );
}
