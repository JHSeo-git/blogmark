function CardSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden">
      <div className="animate-pulse bg-base-300 rounded-lg overflow-hidden">
        <div className="w-full aspect-video" />
      </div>
      <div className="animate-pulse mt-3 h-8 w-1/2 bg-base-300 rounded-lg" />
      <div className="animate-pulse mt-1 h-6 w-4/5 bg-base-300 rounded-lg" />
    </div>
  );
}

export default CardSkeleton;