'use server';

import { revalidatePath } from 'next/cache';

import { connectToDatabase } from '@/shared/lib/mongoose';
import { CommentModel, UserModel } from '@/shared/schemas';
import {
  CommentItemData,
  CreateCommentParams,
  QuerySortFilter,
} from '@/shared/types';

export async function createComment(
  params: CreateCommentParams,
): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    const newComment = await CommentModel.create(params);

    revalidatePath(params.path || '/');
    if (!newComment) return false;

    return true;
  } catch (error) {
    console.log(error);
  }
}
export async function getCommentsByLesson(
  lessonId: string,
  sort: QuerySortFilter,
): Promise<CommentItemData[] | undefined> {
  try {
    connectToDatabase();
    const comments = await CommentModel.find<CommentItemData>({
      lesson: lessonId,
    })
      .sort({ created_at: sort === 'recent' ? -1 : 1 })
      .populate({
        path: 'user',
        model: UserModel,
        select: 'name avatar',
      });

    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    console.log(error);
  }
}
