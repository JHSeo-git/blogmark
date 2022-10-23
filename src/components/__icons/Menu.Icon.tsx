export type MenuIconProps = React.SVGProps<SVGSVGElement>;

function MenuIcon({ width = 24, height = 24, ...rest }: MenuIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

export default MenuIcon;
