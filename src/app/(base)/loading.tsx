import { CardSkeleton } from '@/components/Card';

function Loading() {
  return (
    <>
      <div className="flex items-center justify-center">{/* TODO: tabs */}</div>
      <ul className="p-4 grid grid-cols-1 gap-10">
        {Array.from({ length: 10 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={`CardSkeleton_${index}`}>
            <CardSkeleton />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Loading;
