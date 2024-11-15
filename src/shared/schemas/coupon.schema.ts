import { model, models, Schema } from 'mongoose';

import { CouponType } from '../constants';
import { CouponModelProps } from '../types';

const couponSchema = new Schema<CouponModelProps>({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  active: {
    type: Boolean,
  },
  used: {
    type: Number,
    default: 0,
  },
  limit: {
    type: Number,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
  type: {
    type: String,
    enum: Object.values(CouponType),
    default: CouponType.PERCENT,
  },
  value: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const CouponModel =
  models.Coupon || model<CouponModelProps>('Coupon', couponSchema);
