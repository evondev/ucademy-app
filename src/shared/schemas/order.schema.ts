import { model, models, Schema } from 'mongoose';

import { OrderStatus } from '../constants';
import { OrderModelProps } from '../types';

const orderSchema = new Schema<OrderModelProps>({
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
    ref: 'Course',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  coupon: {
    type: Schema.Types.ObjectId,
    ref: 'Coupon',
  },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING,
  },
});

export const OrderModel =
  models.Order || model<OrderModelProps>('Order', orderSchema);
