import { Document, Schema } from 'mongoose';

import { OrderStatus } from '@/shared/constants';

export interface OrderModelProps extends Document {
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
