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
        {icon}
        {onlyIcon ? null : title}
      </ActiveLink>
    </li>
  );
};

export default MenuItem;
