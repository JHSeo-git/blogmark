'use client';

import { getDateByString } from '@/lib/utils';
import type { SerializedItem } from '@/services/item.service/item.service';

import ExternalLinkIcon from '../__icons/ExternalLink.Icon';
import CardFavicon from './Card.Favicon';
import CardThumbnail from './Card.Thumbnail';

interface CardProps {
  item: SerializedItem;
}

function Card({ item }: CardProps) {
  const {
    url,
    title,
    description,
    thumbnail,
    createdAt,
    userName,
    favicon,
    publisher,
    publisherUrl,
  } = item;

  return (
    <article className="relative group">
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="z-10 absolute top-2 right-2 flex justify-center items-center p-2 rounded-lg text-primary group-hover:bg-base-100 transition-all"
        >
          <ExternalLinkIcon width={20} height={20} />
        </a>
      )}
      <CardThumbnail title={title} src={thumbnail} alt={`${title}'s thumbnail`}>
        <div className="bg-base-100 z-[1] rounded-full border-base-300 border-4 absolute p-1 -bottom-4 right-4">
          {favicon && (
            <a
              className="flex justify-center items-center"
              href={publisherUrl}
              target="_blank"
              rel="noreferrer"
            >
              <CardFavicon src={favicon} publisher={publisher} />
            </a>
          )}
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
