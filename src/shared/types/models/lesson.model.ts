import { Schema } from 'mongoose';

import { LessonType } from '../../constants';

export interface LessonModelProps extends Document {
  _id: string;
  title: string;
  slug: string;
  lecture: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  order: number;
  duration: number;
  video_url: string;
  content: string;
  type: LessonType;
  _destroy: boolean;
  created_at: Date;
}
