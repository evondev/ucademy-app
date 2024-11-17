import { MouseEvent } from 'react';

import { cn } from '@/shared/utils';

export interface OutlineActionProps {
  onClick?: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => void;
  children: React.ReactNode;
  variant: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

function OutlineAction({
  children,
  onClick,
  variant = 'default',
}: OutlineActionProps) {
  const variantsClassName: Record<OutlineActionProps['variant'], string> = {
    default: '',
    success: 'text-green-500',
    warning: 'text-orange-500',
    danger: 'text-red-500',
    info: 'text-blue-500',
  };

  return (
    <button
      type="button"
      className={cn(
        'borderDarkMode hover:border/80 dark:hover:border/20 flex size-8 items-center justify-center rounded-md border p-2 text-gray-500 dark:bg-transparent',
        variantsClassName[variant],
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default OutlineAction;
