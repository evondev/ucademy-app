import { model, models, Schema } from 'mongoose';

import { UserRole, UserStatus } from '../constants';
import { UserModelProps } from '../types';

const userSchema = new Schema<UserModelProps>({
  clerkId: {
    type: String,
  },
  name: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  avatar: {
    type: String,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER,
  },
  status: {
    type: String,
    enum: Object.values(UserStatus),
    default: UserStatus.ACTIVE,
  },
});

export const UserModel =
  models.User || model<UserModelProps>('User', userSchema);
