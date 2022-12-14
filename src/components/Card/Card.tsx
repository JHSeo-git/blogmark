'use client';

import { useState } from 'react';

import { deleteLikeItem, likeItem } from '@/lib/api/items';
import { cn, getDateByString } from '@/lib/utils';
import type { SerializedItem } from '@/services/item.service/item.service';

import HeartIcon from '../__icons/Heart.Icon';
import MoreVerticalIcon from '../__icons/MoreVertical.Icon';
import Hidden from '../Hidden';
import ProtectedButton from '../ProtectedButton';
import CardFavicon from './Card.Favicon';
import CardThumbnail from './Card.Thumbnail';

interface CardProps {
  item: SerializedItem;
}

function Card({ item }: CardProps) {
  const {
    id: itemId,
    url,
    title,
    description,
    thumbnail,
    createdAt,
    userName,
    favicon,
    publisher,
    publisherUrl,
    likes,
    isLike,
  } = item;
  const [isLiked, setIsLiked] = useState(isLike);
  const [likesCount, setLikesCount] = useState(likes ?? 0);

  const onLike = async () => {
    try {
      if (isLiked) {
        setIsLiked(false);
        setLikesCount((prev) => prev - 1);
        await deleteLikeItem(itemId);
      } else {
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
        await likeItem(itemId);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <article className="relative">
      <a
        href={url ?? undefined}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 block"
      >
        <Hidden>Go to {url}</Hidden>
      </a>

      <CardThumbnail title={title} src={thumbnail} alt={`${title}'s thumbnail`} url={url}>
        <div className="bg-base-100 rounded-full border-base-300 border-4 absolute -bottom-4 right-4">
          {favicon && (
            <a
              className="p-1 flex justify-center items-center"
              href={publisherUrl}
              target="_blank"
              rel="noreferrer"
            >
              <CardFavicon src={favicon} publisher={publisher} />
            </a>
          )}
        </div>
      </CardThumbnail>

      <div className="mt-4 px-1 flex gap-2 items-center relative">
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

      <div className="mt-2 px-1 relative">
        <a href={url ?? undefined} target="_blank" rel="noreferrer">
          <h2 className="text-xl text-neutral font-bold">{title}</h2>
        </a>
        <a href={url ?? undefined} target="_blank" rel="noreferrer">
          <p className="mt-1">{description}</p>
        </a>
      </div>

      <div className="mt-2 flex justify-between items-center relative">
        <div className="flex items-center gap-4">
          <Hidden>좋아요 {likesCount}</Hidden>
        </div>
        <div className="flex items-center gap-4">
          <ProtectedButton
            type="button"
            className="flex justify-center items-center"
            onClick={onLike}
          >
            <HeartIcon
              className={cn(
                'transition-all',
                isLiked ? 'text-red-500' : 'hover:text-gray-400 text-gray-300',
              )}
              width={20}
              height={20}
            />
          </ProtectedButton>

          <ProtectedButton type="button" className="flex justify-center items-center">
            <MoreVerticalIcon
              className="transition-all hover:text-gray-400 text-gray-300"
              width={20}
              height={20}
            />
          </ProtectedButton>
        </div>
      </div>
    </article>
  );
}

export default Card;
