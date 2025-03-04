import React from 'react';

import MenuItemLink from './menu-item-link';

interface MenuItemProps {
  url: string;
  title: string;
  icon: React.ReactNode;
  onlyIcon?: boolean;
}

const MenuItem = ({ icon, onlyIcon, title = '', url = '/' }: MenuItemProps) => {
  return (
    <li>
      <MenuItemLink url={url}>
        {icon}
        {onlyIcon ? null : title}
      </MenuItemLink>
    </li>
  );
};

export default MenuItem;
