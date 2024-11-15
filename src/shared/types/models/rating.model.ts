import { Document, Schema } from 'mongoose';

import { RatingStatus } from '../../constants';

export interface RatingModelProps extends Document {
  _id: string;
  rate: number;
  content: string;
  user: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  status: RatingStatus;
  created_at: Date;
}
