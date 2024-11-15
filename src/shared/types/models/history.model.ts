import { Document, Schema } from 'mongoose';

export interface HistoryModelProps extends Document {
  _id: string;
  created_at: Date;
  course: Schema.Types.ObjectId;
  lesson: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}
