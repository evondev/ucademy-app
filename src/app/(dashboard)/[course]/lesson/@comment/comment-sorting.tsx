'use client';

import { useSearchParams } from 'next/navigation';

import { useQueryString } from '@/shared/hooks';

const CommentSorting = () => {
  const params = useSearchParams();
  const sortValue = params.get('sort');
  const { createQueryString } = useQueryString();
  const handleSortComment = () => {
    createQueryString('sort', sortValue === 'recent' ? 'oldest' : 'recent');
  };

  return (
    <button
      className="flex items-center gap-2 text-sm font-medium"
      type="button"
      onClick={handleSortComment}
    >
      <svg
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {sortValue === 'recent' ? 'Most recent' : 'Oldest'}
    </button>
  );
};

export default CommentSorting;
