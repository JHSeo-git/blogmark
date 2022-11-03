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
      <p>{title}</p>
      <p>{content}</p>
    </div>
  );
}

export default Card;
