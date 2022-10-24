import BaseHeader from './BaseHeader';
import NakedHeader from './NakedHeader';

interface HeaderProps {
  naked?: boolean;
}

function Header({ naked = false }: HeaderProps) {
  if (naked) {
    return <NakedHeader />;
  }

  return <BaseHeader />;
}

export default Header;
