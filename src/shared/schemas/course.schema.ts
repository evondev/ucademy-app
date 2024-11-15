import { model, models, Schema } from 'mongoose';

import { CourseLevel, CourseStatus } from '../constants';
import { CourseModelProps } from '../types';

const courseSchema = new Schema<CourseModelProps>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  intro_url: {
    type: String,
    default: '',
  },
  desc: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    default: 0,
  },
  sale_price: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: Object.values(CourseStatus),
    default: CourseStatus.PENDING,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  lectures: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lecture',
    },
  ],
  rating: {
    type: [Schema.Types.ObjectId],
    ref: 'Rating',
  },
  views: {
    type: Number,
    default: 0,
  },
  info: {
    requirements: {
      type: [String],
    },
    benefits: {
      type: [String],
    },
    qa: [
      {
        question: {
          type: String,
        },
        answer: {
          type: String,
        },
      },
    ],
  },
  _destroy: {
    type: Boolean,
    default: false,
  },
  level: {
    type: String,
    enum: Object.values(CourseLevel),
    default: CourseLevel.BEGINNER,
  },
});

export const CourseModel =
  models.Course || model<CourseModelProps>('Course', courseSchema);
