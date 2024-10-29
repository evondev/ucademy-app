import {
  IconCheck,
  IconDelete,
  IconEdit,
  IconEye,
  IconStudy,
} from "@/shared/components/icons";
import { commonClassNames } from "@/shared/constants";
import Link from "next/link";
type TableActionIcon = "edit" | "delete" | "view" | "study" | "approve";
const TableActionItem = ({
  onClick,
  type,
  url,
}: {
  onClick?: () => void;
  type: TableActionIcon;
  url?: string;
}) => {
  const icon: Record<TableActionIcon, any> = {
    edit: <IconEdit />,
    delete: <IconDelete />,
    view: <IconEye />,
    study: <IconStudy />,
    approve: <IconCheck />,
  };
  if (url)
    return (
      <Link className={commonClassNames.action} href={url}>
        {icon[type]}
      </Link>
    );
  return (
    <button className={commonClassNames.action} onClick={onClick}>
      {icon[type]}
    </button>
  );
};

export default TableActionItem;
