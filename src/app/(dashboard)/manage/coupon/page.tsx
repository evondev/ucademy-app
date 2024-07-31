import { BouncedLink } from "@/components/common";
import Heading from "@/components/common/Heading";
import { IconLeftArrow, IconRightArrow } from "@/components/icons";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { commonClassNames } from "@/constants";

const page = () => {
  return (
    <div>
      <BouncedLink url="/manage/coupon/new"></BouncedLink>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading className="">Quản lý mã giảm giá</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input placeholder="Tìm kiếm coupon..." />
          </div>
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Mã</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Giảm giá</TableHead>
            <TableHead>Sử dụng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody></TableBody>
      </Table>
      <div className="flex justify-end gap-3 mt-5">
        <button className={commonClassNames.paginationButton}>
          <IconLeftArrow />
        </button>
        <button className={commonClassNames.paginationButton}>
          <IconRightArrow />
        </button>
      </div>
    </div>
  );
};

export default page;
