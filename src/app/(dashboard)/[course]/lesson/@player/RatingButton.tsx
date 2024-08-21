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
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const RatingButton = ({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) => {
  const [ratingValue, setRatingValue] = useState(-1);
  const [ratingContent, setRatingContent] = useState("");
  const handleRatingCourse = async () => {};
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-3 rounded-lg h-12 bg-primary text-sm font-semibold px-5 text-white">
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
            />
            <Button variant="primary" className="w-full mt-5">
              Gửi đánh giá
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RatingButton;
