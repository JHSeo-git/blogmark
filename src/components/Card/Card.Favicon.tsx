import { useState } from 'react';

export interface CardFaviconProps {
  src?: string | null;
  alt?: string;
}

function CardFavicon({ src, alt }: CardFaviconProps) {
  const [isError, setIsError] = useState(false);

  return (
    <div className="rounded-full overflow-hidden h-6 w-6">
      {src && !isError ? (
        <picture>
          <source srcSet={src} type="image/*" />
          <img
            src={src}
            alt={alt ?? 'favicon'}
            className="w-full h-full object-cover"
            onError={() => setIsError(true)}
            loading="lazy"
          />
        </picture>
      ) : (
        <div className="w-full h-full bg-secondary" />
      )}
    </div>
  );
}

export default CardFavicon;
