"use server";

import Comment from "@/database/comment.model";
import User from "@/database/user.model";
import { CommentItem } from "@/types";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";

export async function createComment(params: {
  content: string;
  lesson: string;
  user: string;
  level: number;
  parentId?: string;
  path?: string;
}): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    const newComment = await Comment.create(params);
    revalidatePath(params.path || "/");
    if (!newComment) return false;
    return true;
  } catch (error) {
    console.log(error);
  }
}
export async function getCommentsByLesson(
  lessonId: string,
  sort: "recent" | "oldest" = "recent"
): Promise<CommentItem[] | undefined> {
  try {
    connectToDatabase();
    const comments = await Comment.find<CommentItem>({
      lesson: lessonId,
    })
      .sort({ created_at: sort === "recent" ? -1 : 1 })
      .populate({
        path: "user",
        model: User,
        select: "name avatar",
      });
    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    console.log(error);
  }
}
