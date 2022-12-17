import * as PrimitivePopover from '@radix-ui/react-popover';

import { cn } from '@/lib/utils';

import CloseIcon from '../__icons/Close.Icon';

export function Root(props: PrimitivePopover.PopoverProps) {
  return (
    <div className="relative inline-flex justify-center items-center text-left">
      <PrimitivePopover.Root {...props} />
    </div>
  );
}

export function Trigger(props: PrimitivePopover.PopoverTriggerProps) {
  return <PrimitivePopover.Trigger {...props} />;
}

interface ContentProps {
  hasCloseButton?: boolean;
}
export function Content({
  hasCloseButton = true,
  className,
  children,
  ...rest
}: PrimitivePopover.PopperContentProps & ContentProps) {
  return (
    <PrimitivePopover.Portal>
      <PrimitivePopover.Content
        align="end"
        sideOffset={10}
        alignOffset={-4}
        className={cn(
          'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
          'w-36 rounded-lg p-4 shadow-xl',
          'bg-base-100',
          className,
        )}
        {...rest}
      >
        {/* <PrimitivePopover.Arrow className="fill-current text-base-100" /> */}
        {hasCloseButton && (
          <PrimitivePopover.Close
            className={cn(
              'absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-lg p-1',
              'bg-base-100 hover:bg-base-200 transition-all',
            )}
          >
            <CloseIcon width={18} height={18} />
          </PrimitivePopover.Close>
        )}
        {children}
      </PrimitivePopover.Content>
    </PrimitivePopover.Portal>
  );
}
