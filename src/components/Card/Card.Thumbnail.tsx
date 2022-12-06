import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

interface CardThumbnailProps {
  title?: string;
  src?: string | null;
  alt?: string;
  children?: React.ReactNode;
  className?: string;
  url?: string | null;
}

function CardThumbnail({ title, src, alt, children, className, url }: CardThumbnailProps) {
  const [isError, setIsError] = useState(false);

  return (
    <section className={cn('relative', className)}>
      <a href={url ?? undefined} target="_blank" rel="noreferrer" className="block relative">
        {src && !isError ? (
          <div className="rounded-xl w-full aspect-video object-cover relative overflow-hidden">
            <Image
              src={src}
              alt={alt ?? 'thumbnail'}
              fill
              onError={() => setIsError(true)}
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="select-none bg-gradient-to-b from-secondary to-primary rounded-xl flex items-center justify-center w-full aspect-video text-gray-400">
            <h3 className="text-base-100 text-4xl font-bold truncate mx-4">{title}</h3>
          </div>
        )}
      </a>
      {children}
    </section>
  );
}

export default CardThumbnail;
