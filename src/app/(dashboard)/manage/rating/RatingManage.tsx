"use client";
import { StatusBadge, TableAction } from "@/components/common";
import Heading from "@/components/common/Heading";
import PaginationBtn from "@/components/common/PaginationBtn";
import TableActionItem from "@/components/common/TableActionItem";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ratingStatus } from "@/constants";
import useQueryString from "@/hooks/useQueryString";
import { ERatingStatus } from "@/types/enums";

const RatingManage = () => {
  const { createQueryString, router, pathname } = useQueryString();

  const handleSelectStatus = (status: ERatingStatus) => {
    router.push(`${pathname}?${createQueryString("status", status)}`);
  };
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading className="">Quản lý đánh giá</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input placeholder="Tìm kiếm đánh giá..." />
          </div>
          <Select
            onValueChange={(value) =>
              handleSelectStatus(value as ERatingStatus)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {ratingStatus.map((status) => (
                  <SelectItem value={status.value} key={status.value}>
                    {status.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Khóa học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <strong>Khóa học tuyệt vời quá anh ơi</strong>
            </TableCell>
            <TableCell>
              <strong>Khóa học photoshop</strong>
            </TableCell>
            <TableCell>
              <strong>Evondev</strong>
            </TableCell>
            <TableCell>
              <StatusBadge
                item={{
                  className: "bg-green-100 text-green-500",
                  title: "Đã duyệt",
                }}
              ></StatusBadge>
            </TableCell>
            <TableCell>
              <TableAction>
                <TableActionItem type="approve"></TableActionItem>
                <TableActionItem type="delete"></TableActionItem>
              </TableAction>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <PaginationBtn></PaginationBtn>
    </div>
  );
};

export default RatingManage;
