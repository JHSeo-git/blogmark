import { cn } from '@/lib/utils';

export interface PageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

function PageButton({ className, children, ...rest }: PageButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex items-center justify-center gap-2 rounded-md bg-primary text-primary-content font-bold p-2 disabled:opacity-40',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default PageButton;
