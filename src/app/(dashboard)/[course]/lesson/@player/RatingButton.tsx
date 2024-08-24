"use client";
import { IconStar } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ratingList } from "@/constants";
import { createRating, getRatingByUserId } from "@/lib/actions/rating.actions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const RatingButton = ({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) => {
  const [ratingValue, setRatingValue] = useState(-1);
  const [ratingContent, setRatingContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRatingCourse = async () => {
    setIsLoading(true);
    try {
      const isAlreadyRated = await getRatingByUserId(userId);
      if (isAlreadyRated) {
        toast.warning("Bạn đã đánh giá khóa học này rồi");
        setIsLoading(false);
        return;
      }
      if (!ratingContent || ratingValue === -1) {
        toast.warning("Vui lòng chọn đánh giá và nhập nội dung đánh giá");
        return;
      }
      const res = await createRating({
        rate: ratingValue,
        content: ratingContent,
        user: userId,
        course: courseId,
      });
      if (res) {
        toast.success("Đánh giá thành công");
        setRatingContent("");
        setRatingValue(-1);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const isDisabled = isLoading || ratingValue === -1 || !ratingContent;
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-3 rounded-lg h-12 bg-primary text-sm font-semibold px-5 text-white disabled:opacity-50 disabled:cursor-not-allowed">
        <IconStar />
        <span>Đánh giá khóa học</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="tracking-tight font-bold mb-5 text-xl">
            Đánh giá
          </DialogTitle>
          <DialogDescription>
            <div className="flex justify-between gap-5 mb-5">
              {ratingList.map((rating) => (
                <button
                  key={rating.title}
                  className="flex flex-col gap-3 text-center text-xs items-center"
                  type="button"
                  onClick={() => setRatingValue(rating.value)}
                >
                  <span
                    className={cn(
                      "flex items-center justify-center size-10 rounded-full bg-gray-200",
                      ratingValue === rating.value && "bg-[#ffb86c]"
                    )}
                  >
                    <Image
                      width={20}
                      height={20}
                      alt={rating.title}
                      src={`/rating/${rating.title}.png`}
                    />
                  </span>
                  <strong className="capitalize">{rating.title}</strong>
                </button>
              ))}
            </div>
            <Textarea
              placeholder="Đánh giá của bạn"
              className="h-[200px] resize-none"
              onChange={(e) => setRatingContent(e.target.value)}
              value={ratingContent}
            />
            <Button
              variant="primary"
              className="w-full mt-5"
              onClick={handleRatingCourse}
              disabled={isDisabled}
              isLoading={isLoading}
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
