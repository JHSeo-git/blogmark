export interface HeaderBoxProps {
  children: React.ReactNode;
  className?: string;
}

function HeaderBox({ children, className }: HeaderBoxProps) {
  return (
    <header className="sticky top-0 left-0 right-0 z-50">
      <div className={`px-6 py-4 lg:px-8 lg:py-6 relative ${className ?? ''}`}>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-base-100 to-transparent" />
        {children}
      </div>
    </header>
  );
}

export default HeaderBox;
