import { CouponType } from "@/types/enums";
import { Document, Schema, model, models } from "mongoose";

export interface CouponProps extends Document {
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
const couponSchema = new Schema<CouponProps>({
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
      ref: "Course",
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
const Coupon = models.Coupon || model<CouponProps>("Coupon", couponSchema);
export default Coupon;
