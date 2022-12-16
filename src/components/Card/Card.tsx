'use client';

import { useState } from 'react';

import { deleteLikeItem, likeItem } from '@/lib/api/items';
import { cn, getDateByString } from '@/lib/utils';
import type { SerializedItem } from '@/services/item.service/item.service';

import HeartIcon from '../__icons/Heart.Icon';
import MoreVerticalIcon from '../__icons/MoreVertical.Icon';
import Hidden from '../Hidden';
import ProtectedButton from '../ProtectedButton';
import { useToast } from '../Toast';
import CardFavicon from './Card.Favicon';
import CardThumbnail from './Card.Thumbnail';

interface CardProps {
  item: SerializedItem;
}

function Card({ item }: CardProps) {
  const [isLiked, setIsLiked] = useState(item.isLike);
  const [likesCount, setLikesCount] = useState(item.likes ?? 0);
  const toast = useToast();

  const onLike = async () => {
    try {
      if (isLiked) {
        setIsLiked(false);
        setLikesCount((prev) => prev - 1);
        await deleteLikeItem(item.id);
      } else {
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
        await likeItem(item.id);
      }
    } catch (e) {
      console.error(e);
      toast.add({
        title: '에러',
        description: '좋아요 처리에 실패했습니다.',
      });
    }
  };

  return (
    <article className="relative group">
      <a
        href={item.url ?? undefined}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 block"
      >
        <Hidden>Go to {item.url}</Hidden>
      </a>

      <CardThumbnail
        className="group-hover:-translate-y-1 transition-transform"
        title={item.title}
        src={item.thumbnail}
        alt={`${item.title}'s thumbnail`}
        url={item.url}
      >
        <div className="bg-base-100 rounded-full border-base-300 border-4 absolute -bottom-4 right-4">
          {item.favicon && (
            <a
              className="p-1 flex justify-center items-center"
              href={item.publisherUrl}
              target="_blank"
              rel="noreferrer"
            >
              <CardFavicon src={item.favicon} publisher={item.publisher} />
            </a>
          )}
        </div>
      </CardThumbnail>

      <div className="mt-4 px-1 flex gap-2 items-center relative">
        <p className="text-sm">{item.userName}</p>
        <div className="flex items-center gap-2">
          {item.createdAt && (
            <time
              className="px-3 py-0.5 rounded-full border bg-base-100 text-sm"
              dateTime={item.createdAt ?? undefined}
            >
              {getDateByString(item.createdAt)}
            </time>
          )}
        </div>
      </div>

      <div className="mt-2 px-1 relative">
        <a href={item.url ?? undefined} target="_blank" rel="noreferrer">
          <h2 className="text-xl text-neutral font-bold">{item.title}</h2>
        </a>
        <a href={item.url ?? undefined} target="_blank" rel="noreferrer">
          <p className="mt-1">{item.description}</p>
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
