"use client";
import { BouncedLink, StatusBadge, TableAction } from "@/components/common";
import Heading from "@/components/common/Heading";
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
import { allValue } from "@/constants";
import useQueryString from "@/hooks/useQueryString";
import { TCouponItem } from "@/types";
import { ECouponType } from "@/types/enums";
import ActionDeleteCoupon from "./ActionDeleteCoupon";

const CouponManage = ({ coupons }: { coupons: TCouponItem[] | undefined }) => {
  const { handleSearchData, handleSelectStatus } = useQueryString();

  return (
    <div>
      <BouncedLink url="/manage/coupon/new"></BouncedLink>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading className="">Quản lý mã giảm giá</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              placeholder="Tìm kiếm coupon..."
              onChange={handleSearchData}
            />
          </div>
          <Select defaultValue={allValue}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
        <TableBody>
          {coupons &&
            coupons.length > 0 &&
            coupons.map((coupon) => (
              <TableRow key={coupon.code}>
                <TableCell>
                  <strong>{coupon.code}</strong>
                </TableCell>
                <TableCell>
                  <strong>{coupon.title}</strong>
                </TableCell>
                <TableCell>
                  {coupon.type === ECouponType.AMOUNT ? (
                    <>{coupon.value.toLocaleString("us-US")}</>
                  ) : (
                    <>{coupon.value}%</>
                  )}
                </TableCell>
                <TableCell>
                  {coupon.used} / {coupon.limit}
                </TableCell>
                <TableCell>
                  {coupon.active ? (
                    <StatusBadge
                      item={{
                        title: "Đang hoạt động",
                        className: "text-green-500",
                      }}
                    ></StatusBadge>
                  ) : (
                    <StatusBadge
                      item={{
                        title: "Chưa kích hoạt",
                        className: "text-orange-500",
                      }}
                    ></StatusBadge>
                  )}
                </TableCell>
                <TableCell>
                  <TableAction>
                    <TableActionItem
                      type="edit"
                      url={`/manage/coupon/update?code=${coupon.code}`}
                    ></TableActionItem>
                    <ActionDeleteCoupon code={coupon.code}></ActionDeleteCoupon>
                  </TableAction>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CouponManage;
