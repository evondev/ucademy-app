import { commonClassNames } from '@/shared/constants';
import { cn } from '@/shared/utils';

import { BadgeStatusVariant } from '../types';

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
        commonClassNames.status,
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
