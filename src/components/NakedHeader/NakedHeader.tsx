import BackButton from '../BackButton';

export interface NakedHeaderProps {
  hasBack?: boolean;
}

function NakedHeader({ hasBack = true }: NakedHeaderProps) {
  return (
    <header className="sticky top-0 left-0 right-0 z-50">
      <div className="p-8 relative">
        <div className="flex justify-between">{hasBack && <BackButton />}</div>
      </div>
    </header>
  );
}

export default NakedHeader;
