import { BadgeStatusVariant } from '@/shared/types';
import { cn } from '@/shared/utils';

interface BadgeStatusProps {
  title?: string;
  onClick?: () => void;
  variant?: BadgeStatusVariant;
  className?: string;
}

const BadgeStatus = ({
  className = '',
  onClick,
  title,
  variant = 'default',
}: BadgeStatusProps) => {
  const variantsClassNames: Record<BadgeStatusVariant, string> = {
    default: '',
    success: 'text-green-500',
    warning: 'text-orange-500',
    danger: 'text-red-500',
  };

  return (
    <span
      className={cn(
        'whitespace-nowrap rounded-md border border-current bg-opacity-10 px-3 py-1 text-xs font-medium',
        variantsClassNames[variant],
        className,
      )}
      onClick={onClick}
    >
      {title}
    </span>
  );
};

export default BadgeStatus;
