import { Document, Schema } from 'mongoose';

import { CommentStatus } from '@/shared/constants';

export interface CommentModelProps extends Document {
  _id: string;
  content: string;
  lesson: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  status: CommentStatus;
  created_at: Date;
  parentId?: Schema.Types.ObjectId;
  level: number;
}
