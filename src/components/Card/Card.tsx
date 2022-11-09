'use client';

import CardFavicon from './Card.Favicon';
import CardThumbnail from './Card.Thumbnail';

interface CardProps {
  title: string;
  content?: string | null;
  thumbnail?: string | null;
  date?: string | null;
  author?: string | null;
  favicon?: string | null;
  publisher?: string | null;
}

function Card({ title, content, thumbnail, date, author, favicon, publisher }: CardProps) {
  return (
    <div className="rounded-lg overflow-hidden">
      <div>
        <CardThumbnail src={thumbnail} />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-3 py-0.5 rounded-full border bg-base-100 text-sm">{date}</span>
        </div>
        <div className="flex items-center gap-2">
          {favicon && <CardFavicon src={favicon} />}
          {publisher && <p className="text-sm">{publisher}</p>}
        </div>
      </div>
      <p className="mt-2 text-xl text-neutral font-bold">{title}</p>
      <p>{content}</p>
    </div>
  );
}

export default Card;
