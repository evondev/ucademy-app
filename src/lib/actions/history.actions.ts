'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

import History from '@/database/history.model';
import UserSchema from '@/database/user.model';
import { CreateHistoryParams } from '@/types';

import { connectToDatabase } from '../mongoose';

export async function createHistory(params: CreateHistoryParams) {
  try {
    connectToDatabase();
    const { userId } = auth();
    const findUser = await UserSchema.findOne({ clerkId: userId });

    if (!findUser) return;
    if (params.checked) {
      await History.create({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      });
    } else {
      await History.findOneAndDelete({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      });
    }
    revalidatePath(params.path);
  } catch (error) {
    console.log(error);
  }
}
export async function getHistory(params: {
  course: string;
}): Promise<History[] | undefined> {
  try {
    connectToDatabase();
    const { userId } = auth();
    const findUser = await UserSchema.findOne({ clerkId: userId });

    if (!findUser) return;
    const histories = await History.find({
      course: params.course,
      user: findUser._id,
    });

    return histories;
  } catch (error) {}
}
