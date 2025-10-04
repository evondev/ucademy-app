'use client';
import Image from 'next/image';
import Link from 'next/link';

import { menuItems } from '@/shared/constants';

import { MenuItem } from '../common';

function Sidebar() {
  return (
    <div className="borderDarkMode bgDarkMode fixed inset-y-0 left-0 hidden w-[300px] flex-col gap-10 border-r p-5 lg:flex">
      <Link
        className="mx-auto flex flex-col items-center gap-2 self-start pl-3 text-xl font-bold"
        href="/"
      >
        <Image
          alt="ucademy"
          height={40}
          src="/logo-main.png"
          width={40}
        />
        <span>Ucademy</span>
      </Link>
      <ul className="flex flex-col gap-3">
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

export default Sidebar;
