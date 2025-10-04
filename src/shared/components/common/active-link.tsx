'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/shared/utils';

interface ActiveLinkProps {
  url: string;
  children: React.ReactNode;
}
const ActiveLink = ({ children, url }: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = url === pathname;

  return (
    <Link
      href={url}
      className={cn(
        'flex items-center gap-4 rounded-lg border p-2 text-sm text-black transition-all hover:bg-gray-100 dark:text-grayDark dark:hover:bg-black/10',
        {
          'svg-animate border-gray-200 bg-gray-100 font-bold shadow-sm dark:border-gray-200/10 dark:bg-black/10 dark:text-white':
            isActive,
          'border-transparent font-medium': !isActive,
        },
      )}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
