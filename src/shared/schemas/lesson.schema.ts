import { model, models, Schema } from 'mongoose';

import { LessonType } from '../constants';
import { LessonModelProps } from '../types/models/lesson.model';

const lessonSchema = new Schema<LessonModelProps>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
  },
  video_url: {
    type: String,
  },
  _destroy: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  lecture: {
    type: Schema.Types.ObjectId,
    ref: 'Lecture',
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  type: {
    type: String,
    enum: Object.values(LessonType),
    default: LessonType.VIDEO,
  },
});

export const LessonModel =
  models.Lesson || model<LessonModelProps>('Lesson', lessonSchema);
