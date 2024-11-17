import { BadgeStatusVariant } from '../types';
import { OrderStatus } from './enums';

export const orderStatus: {
  title: string;
  value: OrderStatus;
  variant: BadgeStatusVariant;
  className?: string;
}[] = [
  {
    title: 'Đã duyệt',
    value: OrderStatus.COMPLETED,
    className: 'text-green-500 bg-green-500',
    variant: 'success',
  },
  {
    title: 'Chờ duyệt',
    value: OrderStatus.PENDING,
    className: 'text-orange-500 bg-orange-500',
    variant: 'warning',
  },
  {
    title: 'Đã hủy',
    value: OrderStatus.CANCELED,
    className: 'text-red-500 bg-red-500',
    variant: 'danger',
  },
];
