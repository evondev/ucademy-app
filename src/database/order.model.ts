import { OrderStatus } from "@/types/enums";
import { Document, Schema, model, models } from "mongoose";

export interface Order extends Document {
  _id: string;
  code: string;
  course: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  status: OrderStatus;
  created_at: Date;
  total: number;
  amount: number;
  discount: number;
  coupon?: Schema.Types.ObjectId;
}
const orderSchema = new Schema<Order>({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  total: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  discount: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  coupon: {
    type: Schema.Types.ObjectId,
    ref: "Coupon",
  },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING,
  },
});
const Order = models.Order || model<Order>("Order", orderSchema);
export default Order;
