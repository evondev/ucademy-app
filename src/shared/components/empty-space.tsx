import { TableCell, TableRow } from "@/shared/components/ui/table";

const EmptySpace = ({ text }: { text?: string }) => {
  return (
    <TableRow>
      <TableCell colSpan={99}>
        <div className="flex items-center justify-center text-center h-20">
          {text || "Không có dữ liệu"}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EmptySpace;
