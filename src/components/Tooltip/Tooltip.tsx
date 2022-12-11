import * as PrimitiveTooltip from '@radix-ui/react-tooltip';

import { cn } from '@/lib/utils';

export function Provider({ ...rest }: PrimitiveTooltip.TooltipProviderProps) {
  return <PrimitiveTooltip.Provider {...rest} />;
}

export function Root({ ...rest }: PrimitiveTooltip.TooltipProps) {
  return <PrimitiveTooltip.Root {...rest} />;
}

export function Trigger({ ...rest }: PrimitiveTooltip.TooltipTriggerProps) {
  return <PrimitiveTooltip.Trigger {...rest} />;
}

export function Content({ children, className, ...rest }: PrimitiveTooltip.TooltipContentProps) {
  return (
    <PrimitiveTooltip.Portal>
      <PrimitiveTooltip.Content
        sideOffset={15}
        side="top"
        className={cn(
          'radix-side-top:animate-slide-down-fade',
          'radix-side-right:animate-slide-left-fade',
          'radix-side-bottom:animate-slide-up-fade',
          'radix-side-left:animate-slide-right-fade',
          'shadow-md bg-base-100 text-neutral rounded-md px-2 py-1',
          className,
        )}
        {...rest}
      >
        <>
          {typeof children === 'string' ? (
            <span className="block text-sm font-bold">{children}</span>
          ) : (
            children
          )}
          <PrimitiveTooltip.Arrow className="fill-current text-base-100" />
        </>
      </PrimitiveTooltip.Content>
    </PrimitiveTooltip.Portal>
  );
}
