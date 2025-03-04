'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItemLinkProps {
  url: string;
  children: React.ReactNode;
}
const MenuItemLink = ({ children, url }: MenuItemLinkProps) => {
  const pathname = usePathname();
  const isActive = url === pathname;

  return (
    <Link
      href={url}
      className={`flex items-center gap-2 rounded-lg p-3 text-base text-slate-600 transition-all dark:text-grayDark ${
        isActive
          ? 'svg-animate bg-primary/10 font-medium !text-primary'
          : 'hover:!text-slate-800'
      } `}
    >
      {children}
    </Link>
  );
};

export default MenuItemLink;
