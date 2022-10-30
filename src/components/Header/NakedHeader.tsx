import BackButton from '../BackButton';
import HeaderBox from './Header.Box';

export interface NakedHeaderProps {
  hasBack?: boolean;
}

function NakedHeader({ hasBack = true }: NakedHeaderProps) {
  return (
    <HeaderBox className="border-b bg-base-100">
      <div className="flex justify-between">{hasBack && <BackButton />}</div>
    </HeaderBox>
  );
}

export default NakedHeader;
