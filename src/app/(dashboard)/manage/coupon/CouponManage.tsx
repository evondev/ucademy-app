"use client";
import { BouncedLink, StatusBadge, TableAction } from "@/components/common";
import Heading from "@/components/common/Heading";
import Pagination from "@/components/common/Pagination";
import TableActionItem from "@/components/common/TableActionItem";
import { allValue, couponStatuses } from "@/constants";
import useQueryString from "@/hooks/useQueryString";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { CouponItem } from "@/types";
import { CouponType } from "@/types/enums";
import ActionDeleteCoupon from "./ActionDeleteCoupon";

const CouponManage = ({
  coupons,
  totalPages,
  total,
}: {
  coupons: CouponItem[] | undefined;
  totalPages: number;
  total: number;
}) => {
  const { handleSearchData, handleChangeQs } = useQueryString();

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
          <Select
            defaultValue={allValue}
            onValueChange={(value) => handleChangeQs("active", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {couponStatuses.map((item) => (
                  <SelectItem key={item.value} value={`${item.value}`}>
                    {item.title}
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
                  {coupon.type === CouponType.AMOUNT ? (
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
                        title: "Đang kích hoạt",
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
      <Pagination totalPages={totalPages} total={total}></Pagination>
    </div>
  );
};

export default CouponManage;
