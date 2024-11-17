'use client';

import {
  BadgeStatus,
  BouncedLink,
  Heading,
  Pagination,
  TableAction,
  TableActionItem,
} from '@/shared/components/common';
import {
  InputFormatCurrency,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import { allValue, couponStatuses, CouponType } from '@/shared/constants';
import { useQueryString } from '@/shared/hooks';
import { CouponItemData } from '@/shared/types';

import DeleteCouponModal from './delete-coupon-modal';

export interface ManageCouponContainerProps {
  coupons?: CouponItemData[];
  totalPages: number;
  total: number;
}

function ManageCouponContainer({
  coupons,
  total,
  totalPages,
}: ManageCouponContainerProps) {
  const { handleChangeQs, handleSearchData } = useQueryString();

  return (
    <div>
      <BouncedLink url="/manage/coupon/new" />
      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <Heading className="">Quản lý mã giảm giá</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <InputFormatCurrency
              placeholder="Tìm kiếm coupon..."
              onChange={handleSearchData}
            />
          </div>
          <Select
            defaultValue={allValue}
            onValueChange={(value) => handleChangeQs('active', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {couponStatuses.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={`${item.value}`}
                  >
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
          {!!coupons &&
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
                    <>{coupon.value.toLocaleString('us-US')}</>
                  ) : (
                    <>{coupon.value}%</>
                  )}
                </TableCell>
                <TableCell>
                  {coupon.used} / {coupon.limit}
                </TableCell>
                <TableCell>
                  {coupon.active ? (
                    <BadgeStatus
                      title="Đang kích hoạt"
                      variant="success"
                    />
                  ) : (
                    <BadgeStatus
                      title="Chưa kích hoạt"
                      variant="warning"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <TableAction>
                    <TableActionItem
                      type="edit"
                      url={`/manage/coupon/update?code=${coupon.code}`}
                    />
                    <DeleteCouponModal code={coupon.code} />
                  </TableAction>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination
        total={total}
        totalPages={totalPages}
      />
    </div>
  );
}

export default ManageCouponContainer;
