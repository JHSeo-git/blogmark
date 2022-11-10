'use client';

import { getDateByString } from '@/lib/utils';

import Hidden from '../Hidden';
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
      <CardThumbnail src={thumbnail}>
        <div className="bg-base-100 z-[1] rounded-full border-base-300 border-4 absolute p-1 -bottom-4 right-4">
          <div className="flex items-center gap-2">
            {favicon && <CardFavicon src={favicon} />}
            <Hidden>{publisher && <p className="text-sm">{publisher}</p>}</Hidden>
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
      <div className="mt-2 px-1 flex items-center justify-between">
        <p className="text-xl text-neutral font-bold">{title}</p>
      </div>
      <div className="mt-2">
        <p>{content}</p>
      </div>
    </article>
  );
}

export default Card;
