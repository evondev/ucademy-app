import * as React from 'react';

import { cn } from '@/shared/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'focus-primary flex h-10 min-h-20 w-full resize-none rounded-md border border-gray-200 bg-white p-3 text-sm font-medium outline-none transition-all focus:!border-primary dark:border-opacity-10 dark:bg-grayDarker',
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea };
