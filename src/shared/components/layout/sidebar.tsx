'use client';
import Image from 'next/image';
import Link from 'next/link';

import { menuItems } from '@/shared/constants';

import { MenuItem } from '../common';

export interface SidebarProps {}

export function Sidebar(_props: SidebarProps) {
  return (
    <div className="fixed inset-y-0 left-0 z-50 hidden w-[250px] flex-col bg-white lg:flex">
      <Link
        className="flex items-center justify-center p-5"
        href="/"
      >
        <Image
          alt="ucademy"
          height={40}
          src="/logo-books.png"
          width={40}
        />
      </Link>
      <ul className="flex flex-col gap-3 px-3">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            title={item.title}
            url={item.url}
          />
        ))}
      </ul>
    </div>
  );
}
