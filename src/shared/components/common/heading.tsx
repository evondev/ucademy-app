import React from 'react';

import { cn } from '@/shared/utils';

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}
const Heading = ({ children, className = '' }: HeadingProps) => {
  return (
    <h1 className={cn('text-2xl font-bold lg:text-3xl', className)}>
      {children}
    </h1>
  );
};

export default Heading;
