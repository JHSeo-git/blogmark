import Image from 'next/image';
import { useState } from 'react';

import * as Tooltip from '../Tooltip';

export interface CardFaviconProps {
  src?: string | null;
  alt?: string;
  publisher?: string | null;
}

function CardFavicon({ src, alt, publisher }: CardFaviconProps) {
  const [isError, setIsError] = useState(false);

  return (
    <Tooltip.Provider delayDuration={100}>
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
        <Tooltip.Content>{publisher}</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export default CardFavicon;
