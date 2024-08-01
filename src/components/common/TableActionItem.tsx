import { commonClassNames } from "@/constants";
import Link from "next/link";
import { IconDelete, IconEdit, IconEye, IconStudy } from "../icons";
type TableActionIcon = "edit" | "delete" | "view" | "study";
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
  };
  if (url)
    return (
      <Link href={url} className={commonClassNames.action}>
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
