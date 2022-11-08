'use client';

import CardThumbnail from './Card.Thumbnail';

interface CardProps {
  title: string;
  content?: string;
  thumbnail?: string;
  date?: string;
  author?: string;
}

function Card({ title, content, thumbnail, date, author }: CardProps) {
  return (
    <div className="rounded-lg overflow-hidden">
      <div>
        <CardThumbnail src={thumbnail} />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center">
          <span className="px-3 py-0.5 rounded-full border bg-base-100 text-sm">{date}</span>
        </div>
        <div>{author && <p className="text-sm">{author}</p>}</div>
      </div>
      <p className="mt-2 text-xl text-neutral font-bold">{title}</p>
      <p>{content}</p>
    </div>
  );
}

export default Card;
