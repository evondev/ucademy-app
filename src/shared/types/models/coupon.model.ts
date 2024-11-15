import { Document, Schema } from 'mongoose';

import { CouponType } from '@/shared/constants';

export interface CouponModelProps extends Document {
  _id: string;
  title: string;
  code: string;
  active: boolean;
  start_date: Date;
  end_date: Date;
  used: number;
  limit: number;
  courses: Schema.Types.ObjectId[];
  type: CouponType;
  value: number;
  created_at: Date;
}
