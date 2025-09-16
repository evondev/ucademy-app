import React from 'react';

import ActiveLink from './active-link';

interface MenuItemProps {
  url: string;
  title: string;
  icon: React.ReactNode;
  onlyIcon?: boolean;
}

const MenuItem = ({ icon, onlyIcon, title = '', url = '/' }: MenuItemProps) => {
  return (
    <li>
      <ActiveLink url={url}>
        <div className="bgDarkMode flex size-8 items-center justify-center rounded-lg">
          {icon}
        </div>
        {onlyIcon ? null : title}
      </ActiveLink>
    </li>
  );
};

export default MenuItem;
