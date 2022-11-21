import Providers from '@/components/Providers';

export interface ItemsLayoutProps {
  children: React.ReactNode;
}

function ItemsLayout({ children }: ItemsLayoutProps) {
  return <Providers>{children}</Providers>;
}

export default ItemsLayout;
