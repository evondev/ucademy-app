'use client';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

import {
  createRating,
  getRatingByUserId,
} from '@/modules/rating/actions/rating.actions';
import { IconStar } from '@/shared/components/icons';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Textarea,
} from '@/shared/components/ui';
import { ratingList } from '@/shared/constants';
import { useUserContext } from '@/shared/contexts';
import { cn } from '@/shared/utils';

interface RatingButtonProps {
  courseId: string;
}
const RatingButton = ({ courseId }: RatingButtonProps) => {
  const { userInfo } = useUserContext();
  const userId = userInfo?._id || '';
  const [ratingValue, setRatingValue] = useState(-1);
  const [ratingContent, setRatingContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRatingCourse = async () => {
    setIsLoading(true);
    try {
      const isAlreadyRated = await getRatingByUserId(userId);

      if (isAlreadyRated) {
        toast.warning('Bạn đã đánh giá khóa học này rồi');
        setIsLoading(false);

        return;
      }
      if (!ratingContent || ratingValue === -1) {
        toast.warning('Vui lòng chọn đánh giá và nhập nội dung đánh giá');

        return;
      }
      const hasResult = await createRating({
        rate: ratingValue,
        content: ratingContent,
        user: userId,
        course: courseId,
      });

      if (hasResult) {
        toast.success('Đánh giá thành công');
        setRatingContent('');
        setRatingValue(-1);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const isDisabled = isLoading || ratingValue === -1 || !ratingContent;

  return (
    <Dialog>
      <DialogTrigger className="flex h-12 items-center gap-3 rounded-lg bg-primary px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
        <IconStar />
        <span>Đánh giá khóa học</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5 text-xl font-bold tracking-tight">
            Đánh giá
          </DialogTitle>
          <DialogDescription>
            <div className="mb-5 flex justify-between gap-5">
              {ratingList.map((rating) => (
                <button
                  key={rating.title}
                  className="flex flex-col items-center gap-3 text-center text-xs"
                  type="button"
                  onClick={() => setRatingValue(rating.value)}
                >
                  <span
                    className={cn(
                      'flex size-10 items-center justify-center rounded-full bg-gray-200',
                      ratingValue === rating.value && 'bg-[#ffb86c]',
                    )}
                  >
                    <Image
                      alt={rating.title}
                      height={20}
                      src={`/rating/${rating.title}.png`}
                      width={20}
                    />
                  </span>
                  <strong className="capitalize">{rating.title}</strong>
                </button>
              ))}
            </div>
            <Textarea
              className="h-[200px] resize-none"
              placeholder="Đánh giá của bạn"
              value={ratingContent}
              onChange={(event) => setRatingContent(event.target.value)}
            />
            <Button
              className="mt-5 w-full"
              disabled={isDisabled}
              isLoading={isLoading}
              variant="primary"
              onClick={handleRatingCourse}
            >
              Gửi đánh giá
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RatingButton;
