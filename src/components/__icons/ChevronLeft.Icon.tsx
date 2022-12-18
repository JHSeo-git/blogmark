export type ChevronLeftIconProps = React.SVGAttributes<SVGSVGElement>;

function ChevronLeftIcon({ width = 24, height = 24, ...rest }: ChevronLeftIconProps) {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export default ChevronLeftIcon;
