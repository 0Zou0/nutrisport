interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

export function Badge({ children, className = '', size = 'md' }: BadgeProps) {
  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-xs'
    : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${sizeClasses} ${className}`}>
      {children}
    </span>
  );
}
