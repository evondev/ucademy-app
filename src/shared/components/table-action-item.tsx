import Link from 'next/link';

import {
  IconCheck,
  IconDelete,
  IconEdit,
  IconEye,
  IconStudy,
} from '@/shared/components/icons';
import { commonClassNames } from '@/shared/constants';

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

  if (url)
    return (
      <Link
        className={commonClassNames.action}
        href={url}
      >
        {icon[type]}
      </Link>
    );

  return (
    <button
      className={commonClassNames.action}
      onClick={onClick}
    >
      {icon[type]}
    </button>
  );
};

export default TableActionItem;
