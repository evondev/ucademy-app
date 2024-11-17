import { UserModelProps } from './models';

export interface UserItemData extends Omit<UserModelProps, ''> {}
export type CreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
};
