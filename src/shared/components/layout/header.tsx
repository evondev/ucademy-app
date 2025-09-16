'use client';
import { useAuth, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

import { ModeToggle } from '../common';
import { IconUsers } from '../icons';
import { Input } from '../ui';

export interface HeaderProps {}

export default function Header(_props: HeaderProps) {
  const { userId } = useAuth();

  return (
    <div className="bgDarkMode flex h-20 flex-col justify-center px-5 py-2">
      <div className="flex items-center justify-between gap-5">
        <Input
          className="w-[400px]"
          placeholder="Search course..."
        />
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
    </div>
  );
}
