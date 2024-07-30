import { commonClassNames } from "@/constants";
import { cn } from "@/lib/utils";

const StatusBadge = ({
  item,
  onClick,
}: {
  item?: {
    className?: string;
    title: string;
  };
  onClick?: () => void;
}) => {
  return (
    <span
      className={cn(commonClassNames.status, item?.className)}
      onClick={onClick}
    >
      {item?.title}
    </span>
  );
};

export default StatusBadge;
