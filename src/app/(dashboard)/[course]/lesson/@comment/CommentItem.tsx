"use client";
import { ICommentItem } from "@/types";
import { getRepliesComment, timeAgo } from "@/utils";
import Image from "next/image";
import CommentReply from "./CommentReply";

interface ICommentItemProps {
  comment: ICommentItem;
  lessonId: string;
  userId: string;
  comments: ICommentItem[];
}

const CommentItem = ({
  comment,
  lessonId,
  userId,
  comments = [],
}: ICommentItemProps) => {
  const replies = getRepliesComment(comments, comment._id);
  const level = comment.level || 0;
  const COMMENT_SPACING = 55;
  return (
    <>
      <div
        className="flex items-start gap-3 ml-auto dark:border-opacity-50"
        style={{
          width: `calc(100% - ${level * COMMENT_SPACING}px)`,
        }}
      >
        <div className="size-10 rounded-full border borderDarkMode bgDarkMode flex-shrink-0">
          <Image
            src={comment.user.avatar}
            alt={comment.user.name}
            width={40}
            height={40}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-sm">{comment.user.name}</h4>
            <span className="rounded-full size-1 bg-gray-500"></span>
            <span className="text-xs text-gray-500 font-medium">
              {timeAgo(comment.created_at)}
            </span>
          </div>
          <div className="p-5 rounded-lg border borderDarkMode bgDarkMode">
            <p className="mb-3 text-sm leading-relaxed text-gray-600 dark:text-white font-medium">
              {comment.content}
            </p>
            <CommentReply
              lessonId={lessonId}
              userId={userId}
              comment={comment}
            />
          </div>
        </div>
      </div>
      {replies.length > 0 &&
        replies.map((reply) => (
          <CommentItem
            key={reply._id}
            comment={reply}
            lessonId={lessonId}
            userId={userId}
            comments={comments}
          />
        ))}
    </>
  );
};

export default CommentItem;
