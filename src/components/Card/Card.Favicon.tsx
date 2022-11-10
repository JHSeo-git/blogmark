import Image from 'next/image';
import { useState } from 'react';

export interface CardFaviconProps {
  src?: string | null;
  alt?: string;
}

function CardFavicon({ src, alt }: CardFaviconProps) {
  const [isError, setIsError] = useState(false);

  return (
    <div className="rounded-full overflow-hidden h-5 w-5">
      {src && !isError ? (
        <div className="w-full h-full object-cover relative">
          <Image
            src={src}
            alt={alt ?? 'favicon'}
            fill
            onError={() => setIsError(true)}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="w-full h-full bg-secondary" />
      )}
    </div>
  );
}

export default CardFavicon;
