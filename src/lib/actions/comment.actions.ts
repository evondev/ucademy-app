"use server";

import Comment from "@/database/comment.model";
import User from "@/database/user.model";
import { ICommentItem } from "@/types";
import { ECommentStatus } from "@/types/enums";
import { connectToDatabase } from "../mongoose";

export async function createComment(params: {
  content: string;
  lesson: string;
  user: string;
  level: number;
  parentId?: string;
}): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    const newComment = await Comment.create(params);
    if (!newComment) return false;
    return true;
  } catch (error) {
    console.log(error);
  }
}
export async function getCommentsByLesson(
  lessonId: string
): Promise<ICommentItem[] | undefined> {
  try {
    connectToDatabase();
    const comments = await Comment.find<ICommentItem>({
      lesson: lessonId,
      status: ECommentStatus.APPROVED,
    }).populate({
      path: "user",
      model: User,
      select: "name avatar",
    });
    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    console.log(error);
  }
}
