"use client";

import { cn } from "@/lib/utils";
import { MAX_COMMENT_LEVEL } from "@/shared/constants";
import { CommentItem } from "@/types";
import { useState } from "react";
import CommentForm from "./CommentForm";

interface CommentReplyProps {
  comment: CommentItem;
  lessonId: string;
  userId: string;
}

const CommentReply = ({ comment, lessonId, userId }: CommentReplyProps) => {
  const [isShowReply, setIsShowReply] = useState(false);
  return (
    <>
      <div className="flex items-center gap-5 text-sm text-gray-400 font-medium">
        {comment.level <= MAX_COMMENT_LEVEL && (
          <>
            <button
              type="button"
              className={cn("uppercase text-gray-400 font-bold", {
                underline: isShowReply,
              })}
              onClick={() => setIsShowReply(!isShowReply)}
            >
              Reply
            </button>
          </>
        )}
      </div>
      {isShowReply && (
        <div className="mt-3">
          <CommentForm
            isReply
            closeReply={() => setIsShowReply(false)}
            comment={comment}
            lessonId={lessonId}
            userId={userId}
          />
        </div>
      )}
    </>
  );
};

export default CommentReply;
