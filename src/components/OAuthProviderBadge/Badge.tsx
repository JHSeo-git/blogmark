interface BadgeProps {
  children: React.ReactNode;
}

function Badge({ children }: BadgeProps) {
  return (
    <div className="rounded-xl shadow py-4 px-6 flex justify-center items-center capitalize">
      {children}
    </div>
  );
}

export default Badge;
