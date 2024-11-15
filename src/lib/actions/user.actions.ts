'use server';

import UserSchema, { User } from '@/database/user.model';
import { CreateUserParams } from '@/types';

import { connectToDatabase } from '../mongoose';

export async function createUser(params: CreateUserParams) {
  try {
    connectToDatabase();
    const user = await UserSchema.create(params);

    return user;
  } catch (error) {
    console.log(error);
  }
}
export async function getUserInfo({
  userId,
}: {
  userId: string;
}): Promise<User | null | undefined> {
  try {
    connectToDatabase();
    const findUser = await UserSchema.findOne({ clerkId: userId });

    if (!findUser) return null;

    return findUser;
  } catch (error) {
    console.log(error);
  }
}
