"use client";
import { cn } from "@/lib/utils";
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
  const commentBorderClassNames: { [key: string]: string } = {
    "0": "borderDarkMode",
    "1": "border-blue-200",
    "2": "border-green-200",
    "3": "border-yellow-200",
    "4": "border-red-200",
  };
  return (
    <>
      <div
        className={cn(
          "flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-grayDarker border ml-auto dark:border-opacity-50",
          commentBorderClassNames[level.toString()]
        )}
        style={{
          width: `calc(100% - ${level * 65}px)`,
        }}
      >
        <div className="size-10 rounded-full border borderDarkMode shadow-sm flex-shrink-0">
          <Image
            src={comment.user.avatar}
            alt={comment.user.name}
            width={40}
            height={40}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center gap-3">
            <h4 className="font-bold">{comment.user.name}</h4>
            <span className="text-sm text-gray-400 font-medium">
              {timeAgo(comment.created_at)}
            </span>
          </div>
          <p className="mb-3 text-sm leading-relaxed text-gray-900 dark:text-white">
            {comment.content}
          </p>
          <CommentReply lessonId={lessonId} userId={userId} comment={comment} />
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
