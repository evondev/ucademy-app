'use client';
import { useAuth, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

import { IconUsers } from '@/shared/components/icons';
import { menuItems } from '@/shared/constants';

import { MenuItem, ModeToggle } from '../common';

function Sidebar() {
  const { userId } = useAuth();

  return (
    <div className="borderDarkMode bgDarkMode fixed inset-y-0 left-0 hidden w-[300px] flex-col border-r p-5 lg:flex">
      <Link
        className="mb-5 inline-flex h-10 items-center gap-2 self-start pl-3 text-2xl font-bold"
        href="/"
      >
        <span className="bgDarkMode borderDarkMode flex size-10 items-center justify-center rounded-lg border text-lg text-primary">
          U
        </span>
        <span>Ucademy</span>
      </Link>
      <ul className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            title={item.title}
            url={item.url}
          />
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-end gap-2">
        <ModeToggle />
        {userId ? (
          <UserButton />
        ) : (
          <Link
            className="flex size-10 items-center justify-center rounded-lg bg-primary p-1 text-white"
            href="/sign-in"
          >
            <IconUsers />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
