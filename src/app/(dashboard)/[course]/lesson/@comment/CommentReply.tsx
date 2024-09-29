"use client";

import { ICommentItem } from "@/types";
import { formatDate } from "@/utils";
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
      <div className="flex items-center gap-5 text-sm text-gray-400 font-medium mb-5">
        <span>{formatDate(comment.created_at)}</span>
        <span className="rounded-full size-1 bg-gray-300"></span>
        <button type="button" onClick={() => setShowReply(!showReply)}>
          Reply
        </button>
      </div>
      {showReply && (
        <CommentForm comment={comment} lessonId={lessonId} userId={userId} />
      )}
    </>
  );
};

export default CommentReply;
