import { CouponType } from './enums';

export const couponTypes: {
  title: string;
  value: CouponType;
}[] = [
  {
    title: 'Phần trăm',
    value: CouponType.PERCENT,
  },
  {
    title: 'Giá trị',
    value: CouponType.AMOUNT,
  },
];
export const couponStatuses = [
  {
    title: 'Đang kích hoạt',
    value: 1,
  },
  {
    title: 'Chưa kích hoạt',
    value: 0,
  },
];
