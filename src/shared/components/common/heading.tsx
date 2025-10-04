import React from 'react';

import { cn } from '@/shared/utils';

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}
const Heading = ({ children, className = '' }: HeadingProps) => {
  return (
    <h2 className={cn('text-xl font-bold lg:text-2xl', className)}>
      {children}
    </h2>
  );
};

export default Heading;
