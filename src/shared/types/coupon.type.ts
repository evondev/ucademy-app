import { CouponType } from '../constants';

export type CreateCouponParams = {
  title: string;
  code: string;
  type: CouponType;
  value?: number;
  start_date?: Date;
  end_date?: Date;
  active?: boolean;
  limit?: number;
  courses?: string[];
};
export type UpdateCouponParams = {
  _id: string;
  updateData: Partial<CreateCouponParams>;
};
