import Image from 'next/image';
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
        <div className="w-full aspect-video object-cover relative">
          <Image
            src={src}
            alt={alt ?? 'thumbnail'}
            fill
            onError={() => setIsError(true)}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full aspect-video text-gray-400">
          <ImageOffIcon width={32} height={32} />
        </div>
      )}
    </div>
  );
}

export default CardThumbnail;
