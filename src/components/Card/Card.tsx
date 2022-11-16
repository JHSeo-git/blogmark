'use client';

import { getDateByString } from '@/lib/utils';

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
    <article>
      <CardThumbnail title={title} src={thumbnail} alt={`${title}'s thumbnail`}>
        <div className="bg-base-100 z-[1] rounded-full border-base-300 border-4 absolute p-1 -bottom-4 right-4">
          <div className="flex items-center gap-2">
            {favicon && <CardFavicon src={favicon} publisher={publisher} />}
          </div>
        </div>
      </CardThumbnail>
      <div className="mt-4 px-1 flex gap-2 items-center">
        <p className="text-sm">{author}</p>
        <div className="flex items-center gap-2">
          {date && (
            <time
              className="px-3 py-0.5 rounded-full border bg-base-100 text-sm"
              dateTime={date ?? undefined}
            >
              {getDateByString(date)}
            </time>
          )}
        </div>
      </div>
      <div className="mt-2 px-1">
        <h2 className="text-xl text-neutral font-bold">{title}</h2>
        <p className="mt-1">{content}</p>
      </div>
    </article>
  );
}

export default Card;
