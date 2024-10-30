import { Document, model, models, Schema } from 'mongoose';

import { RatingStatus } from '@/types/enums';

export interface RatingProps extends Document {
  _id: string;
  rate: number;
  content: string;
  user: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  status: RatingStatus;
  created_at: Date;
}
const ratingSchema = new Schema<RatingProps>({
  rate: {
    type: Number,
    default: 5,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(RatingStatus),
    default: RatingStatus.UNACTIVE,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const Rating = models.Rating || model<RatingProps>('Rating', ratingSchema);

export default Rating;
