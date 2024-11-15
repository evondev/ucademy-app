'use server';

import { connectToDatabase } from '@/shared/lib/mongoose';
import { UserModel } from '@/shared/schemas';
import { UserModelProps } from '@/shared/types';
import { CreateUserParams } from '@/types';

export async function createUser(params: CreateUserParams) {
  try {
    connectToDatabase();
    const user = await UserModel.create(params);

    return user;
  } catch (error) {
    console.log(error);
  }
}
export async function getUserInfo({
  userId,
}: {
  userId: string;
}): Promise<UserModelProps | null | undefined> {
  try {
    connectToDatabase();
    const findUser = await UserModel.findOne({ clerkId: userId });

    if (!findUser) return null;

    return findUser;
  } catch (error) {
    console.log(error);
  }
}
