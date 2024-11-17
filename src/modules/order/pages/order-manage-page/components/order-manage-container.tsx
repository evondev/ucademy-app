'use client';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { updateOrder } from '@/modules/order/actions/order.actions';
import {
  BadgeStatus,
  EmptySpace,
  Heading,
  Pagination,
} from '@/shared/components/common';
import { IconCancel, IconCheck } from '@/shared/components/icons';
import {
  Input,
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
import {
  allValue,
  ITEMS_PER_PAGE,
  OrderStatus,
  orderStatus,
} from '@/shared/constants';
import { useQueryString } from '@/shared/hooks';
import { OrderItemData } from '@/shared/types/order.type';
import { cn } from '@/shared/utils';

import OrderAction from './order-action';

interface OrderManagePageProps {
  orders?: OrderItemData[];
  total?: number;
}
const OrderManagePage = ({ orders = [], total = 0 }: OrderManagePageProps) => {
  const { handleSearchData, handleSelectStatus } = useQueryString();

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const handleUpdateOrder = async ({
    orderId,
    status,
  }: {
    orderId: string;
    status: OrderStatus;
  }) => {
    if (status === OrderStatus.CANCELED) {
      Swal.fire({
        title: 'Bạn có chắc muốn hủy đơn hàng không?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hủy luôn',
        cancelButtonText: 'Thoát',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateOrder({ orderId, status });
        }
      });
    }
    if (status === OrderStatus.COMPLETED) {
      const response = await updateOrder({ orderId, status });

      if (response?.success) {
        toast.success('Cập nhật đơn hàng thành công');
      }
    }
  };

  return (
    <div>
      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <Heading className="">Quản lý đơn hàng</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              placeholder="Tìm kiếm đơn hàng..."
              onChange={handleSearchData}
            />
          </div>
          <Select
            onValueChange={(value) => handleSelectStatus(value as OrderStatus)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {orderStatus.map((status) => (
                  <SelectItem
                    key={status.value}
                    value={status.value}
                  >
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
            <TableHead>Mã đơn hàng</TableHead>
            <TableHead>Khóa học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Số tiền</TableHead>
            <TableHead>Mã giảm giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 && <EmptySpace text="Không có đơn hàng!" />}
          {orders.length > 0 &&
            orders.map((order) => {
              const orderStatusItem = orderStatus.find(
                (item) => item.value === order.status,
              );

              return (
                <TableRow key={order.code}>
                  <TableCell>
                    <strong>{order.code}</strong>
                  </TableCell>
                  <TableCell>{order.course.title}</TableCell>
                  <TableCell>{order.user?.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <span>{order.amount.toLocaleString('us-US')}</span>
                      {order.discount > 0 && (
                        <span>{order.discount.toLocaleString('us-US')}</span>
                      )}
                      <strong
                        className={cn(
                          orderStatusItem?.className,
                          'bg-transparent',
                        )}
                      >
                        {order.total.toLocaleString('us-US')}
                      </strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    <strong>{order.coupon?.code || ''}</strong>
                  </TableCell>
                  <TableCell>
                    <BadgeStatus
                      title={orderStatusItem?.title}
                      variant={orderStatusItem?.variant}
                    />
                  </TableCell>
                  <TableCell>
                    {order.status !== OrderStatus.CANCELED && (
                      <div className="flex gap-3">
                        {order.status === OrderStatus.PENDING && (
                          <OrderAction
                            onClick={() =>
                              handleUpdateOrder({
                                orderId: order._id,
                                status: OrderStatus.COMPLETED,
                              })
                            }
                          >
                            <IconCheck />
                          </OrderAction>
                        )}
                        <OrderAction
                          onClick={() =>
                            handleUpdateOrder({
                              orderId: order._id,
                              status: OrderStatus.CANCELED,
                            })
                          }
                        >
                          <IconCancel />
                        </OrderAction>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Pagination
        total={total}
        totalPages={totalPages}
      />
    </div>
  );
};

export default OrderManagePage;
