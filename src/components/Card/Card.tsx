'use client';

import { getDateByString } from '@/lib/utils';
import type { SerializedItem } from '@/services/item.service/item.service';

import CardFavicon from './Card.Favicon';
import CardThumbnail from './Card.Thumbnail';

interface CardProps {
  item: SerializedItem;
}

function Card({ item }: CardProps) {
  const { title, description, thumbnail, createdAt, userName, favicon, publisher, publisherUrl } =
    item;

  return (
    <article>
      <CardThumbnail title={title} src={thumbnail} alt={`${title}'s thumbnail`}>
        <div className="bg-base-100 z-[1] rounded-full border-base-300 border-4 absolute p-1 -bottom-4 right-4">
          <div className="flex items-center gap-2">
            {favicon && (
              <a href={publisherUrl}>
                <CardFavicon src={favicon} publisher={publisher} />
              </a>
            )}
          </div>
        </div>
      </CardThumbnail>
      <div className="mt-4 px-1 flex gap-2 items-center">
        <p className="text-sm">{userName}</p>
        <div className="flex items-center gap-2">
          {createdAt && (
            <time
              className="px-3 py-0.5 rounded-full border bg-base-100 text-sm"
              dateTime={createdAt ?? undefined}
            >
              {getDateByString(createdAt)}
            </time>
          )}
        </div>
      </div>
      <div className="mt-2 px-1">
        <h2 className="text-xl text-neutral font-bold">{title}</h2>
        <p className="mt-1">{description}</p>
      </div>
    </article>
  );
}

export default Card;
