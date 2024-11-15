import * as React from 'react';

import { cn } from '@/shared/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'focus-primary flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 text-sm font-medium outline-none transition-all focus:!border-primary disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-opacity-10 dark:bg-grayDarker dark:disabled:bg-grayDarkest',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input };
