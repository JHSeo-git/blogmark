export type MoreVerticalIconProps = React.SVGAttributes<SVGSVGElement>;

function MoreVerticalIcon({ width = 24, height = 24, ...rest }: MoreVerticalIconProps) {
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}

export default MoreVerticalIcon;
