"use client";

import { MAX_COMMENT_LEVEL } from "@/constants";
import { cn } from "@/lib/utils";
import { ICommentItem } from "@/types";
import { useState } from "react";
import CommentForm from "./CommentForm";

interface CommentReplyProps {
  comment: ICommentItem;
  lessonId: string;
  userId: string;
}

const CommentReply = ({ comment, lessonId, userId }: CommentReplyProps) => {
  const [showReply, setShowReply] = useState(false);
  return (
    <>
      <div className="flex items-center gap-5 text-sm text-gray-400 font-medium">
        {comment.level <= MAX_COMMENT_LEVEL && (
          <>
            <button
              type="button"
              className={cn("uppercase text-gray-400 font-bold", {
                underline: showReply,
              })}
              onClick={() => setShowReply(!showReply)}
            >
              Reply
            </button>
          </>
        )}
      </div>
      {showReply && (
        <div className="mt-3">
          <CommentForm
            isReply
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
