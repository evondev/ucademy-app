import { Document, model, models, Schema } from 'mongoose';

export interface HistoryProps extends Document {
  _id: string;
  created_at: Date;
  course: Schema.Types.ObjectId;
  lesson: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}
const historySchema = new Schema<HistoryProps>({
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
const History = models.History || model<HistoryProps>('History', historySchema);

export default History;
