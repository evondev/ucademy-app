'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
      className={`flex items-center gap-3 rounded-md p-3 text-base font-medium text-slate-600 transition-all dark:text-grayDark ${
        isActive
          ? 'svg-animate bg-primary/10 font-semibold !text-primary'
          : 'hover:!bg-primary/10 hover:!text-primary'
      } `}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
