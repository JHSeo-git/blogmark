'use client';

import CardThumbnail from './Card.Thumbnail';

interface CardProps {
  title: string;
  content?: string;
  thumbnail?: string;
}

function Card({ title, content, thumbnail }: CardProps) {
  return (
    <div className="rounded-lg overflow-hidden">
      <CardThumbnail src={thumbnail} />
      <p className="mt-4 text-xl text-neutral font-bold">{title}</p>
      <p>{content}</p>
    </div>
  );
}

export default Card;
