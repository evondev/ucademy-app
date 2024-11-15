import { Document, Schema } from 'mongoose';

import { UserRole, UserStatus } from '@/shared/constants';

export interface UserModelProps extends Document {
  _id: string;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  courses: Schema.Types.ObjectId[];
  status: UserStatus;
  role: UserRole;
  created_at: Date;
}
