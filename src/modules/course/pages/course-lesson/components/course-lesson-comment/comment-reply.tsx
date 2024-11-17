'use client';

import { useState } from 'react';

import { MAX_COMMENT_LEVEL } from '@/shared/constants';
import { CommentItemData } from '@/shared/types';
import { cn } from '@/shared/utils';

import CommentForm from './comment-form';

interface CommentReplyProps {
  comment: CommentItemData;
  lessonId: string;
}

const CommentReply = ({ comment, lessonId }: CommentReplyProps) => {
  const [isShowReply, setIsShowReply] = useState(false);

  return (
    <>
      <div className="flex items-center gap-5 text-sm font-medium text-gray-400">
        {comment.level <= MAX_COMMENT_LEVEL && (
          <>
            <button
              type="button"
              className={cn('font-bold uppercase text-gray-400', {
                underline: isShowReply,
              })}
              onClick={() => setIsShowReply(!isShowReply)}
            >
              Reply
            </button>
          </>
        )}
      </div>
      {!!isShowReply && (
        <div className="mt-3">
          <CommentForm
            isReply
            closeReply={() => setIsShowReply(false)}
            comment={comment}
            lessonId={lessonId}
          />
        </div>
      )}
    </>
  );
};

export default CommentReply;
