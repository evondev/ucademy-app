import { Document, Schema } from 'mongoose';

export interface LectureModelProps extends Document {
  _id: string;
  title: string;
  course: Schema.Types.ObjectId;
  lessons: Schema.Types.ObjectId[];
  created_at: Date;
  order: number;
  _destroy: boolean;
}
