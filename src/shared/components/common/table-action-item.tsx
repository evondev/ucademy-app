import Link from 'next/link';

import {
  IconCheck,
  IconDelete,
  IconEdit,
  IconEye,
  IconStudy,
} from '@/shared/components/icons';

type TableActionIcon = 'edit' | 'delete' | 'view' | 'study' | 'approve';
interface TableActionItemProps {
  onClick?: () => void;
  type: TableActionIcon;
  url?: string;
}
const TableActionItem = ({ onClick, type, url }: TableActionItemProps) => {
  const icon: Record<TableActionIcon, JSX.Element> = {
    edit: <IconEdit />,
    delete: <IconDelete />,
    view: <IconEye />,
    study: <IconStudy />,
    approve: <IconCheck />,
  };

  const className =
    'size-8 rounded-md border flex items-center justify-center p-2  text-gray-500 hover:border-opacity-80 dark:bg-transparent borderDarkMode dark:hover:border-opacity-20';

  if (url)
    return (
      <Link
        className={className}
        href={url}
      >
        {icon[type]}
      </Link>
    );

  return (
    <button
      className={className}
      onClick={onClick}
    >
      {icon[type]}
    </button>
  );
};

export default TableActionItem;
