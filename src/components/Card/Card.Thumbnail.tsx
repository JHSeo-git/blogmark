import Image from 'next/image';
import { useState } from 'react';

import ImageOffIcon from '../__icons/ImageOff.Icon';

interface CardThumbnailProps {
  src?: string | null;
  alt?: string;
  children?: React.ReactNode;
}

function CardThumbnail({ src, alt, children }: CardThumbnailProps) {
  const [isError, setIsError] = useState(false);

  return (
    <section className="bg-base-200 relative">
      {src && !isError ? (
        <div className="rounded-xl w-full aspect-video object-cover relative overflow-hidden">
          <Image
            src={src}
            alt={alt ?? 'thumbnail'}
            fill
            onError={() => setIsError(true)}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="rounded-xl flex items-center justify-center w-full aspect-video text-gray-400">
          <ImageOffIcon width={32} height={32} />
        </div>
      )}
      {children}
    </section>
  );
}

export default CardThumbnail;
