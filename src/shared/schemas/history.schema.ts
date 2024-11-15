import { model, models, Schema } from 'mongoose';

import { HistoryModelProps } from '../types';

const historySchema = new Schema<HistoryModelProps>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const HistoryModel =
  models.History || model<HistoryModelProps>('History', historySchema);
