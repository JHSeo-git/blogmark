import { useRouter } from 'next/router';

import ChevronLeftIcon from '../__icons/ChevronLeft.icon';
import HeaderBox from './Header.Box';

export interface NakedHeaderProps {
  hasBack?: boolean;
}

function NakedHeader({ hasBack = true }: NakedHeaderProps) {
  const router = useRouter();

  const onClick = () => {
    router.back();
  };

  return (
    <HeaderBox className="border-b">
      <div className="flex justify-between">
        {hasBack && (
          <button type="button" className="flex" onClick={onClick}>
            <ChevronLeftIcon />
          </button>
        )}
      </div>
    </HeaderBox>
  );
}

export default NakedHeader;
