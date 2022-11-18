import Image from 'next/image';
import { useState } from 'react';

interface CardThumbnailProps {
  title?: string;
  src?: string | null;
  alt?: string;
  children?: React.ReactNode;
}

function CardThumbnail({ title, src, alt, children }: CardThumbnailProps) {
  const [isError, setIsError] = useState(false);

  return (
    <section className="relative">
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
      {children}
    </section>
  );
}

export default CardThumbnail;
