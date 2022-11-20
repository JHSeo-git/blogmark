import * as Tooltip from '@radix-ui/react-tooltip';
import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

export interface CardFaviconProps {
  src?: string | null;
  alt?: string;
  publisher?: string | null;
}

function CardFavicon({ src, alt, publisher }: CardFaviconProps) {
  const [isError, setIsError] = useState(false);

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="rounded-full overflow-hidden h-5 w-5">
            {src && !isError ? (
              <div className="w-full h-full relative">
                <Image
                  src={src}
                  alt={alt ?? 'favicon'}
                  fill
                  onError={() => setIsError(true)}
                  loading="lazy"
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-secondary" />
            )}
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={15}
            side="top"
            className={cn(
              'radix-side-top:animate-slide-down-fade',
              'radix-side-right:animate-slide-left-fade',
              'radix-side-bottom:animate-slide-up-fade',
              'radix-side-left:animate-slide-right-fade',
              'shadow-md bg-base-100 text-neutral rounded-md px-2 py-1',
            )}
          >
            <span className="block text-sm">{publisher}</span>
            <Tooltip.Arrow className="fill-base-100" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export default CardFavicon;
