import { useState } from 'react';

import ImageOffIcon from '../__icons/ImageOff.Icon';

interface CardThumbnailProps {
  src?: string | null;
  alt?: string;
}

function CardThumbnail({ src, alt }: CardThumbnailProps) {
  const [isError, setIsError] = useState(false);

  return (
    <div className="bg-base-200 rounded-lg overflow-hidden">
      {src && !isError ? (
        <picture>
          <source srcSet={src} type="image/*" />
          <img
            src={src}
            alt={alt ?? 'thumbnail'}
            className="w-full aspect-video object-cover"
            onError={() => setIsError(true)}
            loading="lazy"
          />
        </picture>
      ) : (
        <div className="flex items-center justify-center w-full aspect-video text-gray-400">
          <ImageOffIcon width={32} height={32} />
        </div>
      )}
    </div>
  );
}

export default CardThumbnail;
