import { model, models, Schema } from 'mongoose';

import { CommentStatus } from '../constants';
import { CommentModelProps } from '../types/models/comment.model';

const commentSchema = new Schema<CommentModelProps>({
  content: {
    type: String,
    required: true,
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    default: CommentStatus.PENDING,
    enum: Object.values(CommentStatus),
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  level: {
    type: Number,
    default: 0,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    default: null,
  },
});

export const CommentModel =
  models.Comment || model<CommentModelProps>('Comment', commentSchema);
