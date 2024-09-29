import { ICommentItem } from "@/types";
import { ObjectId } from "mongoose";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const createOrderCode = () =>
  `DH-${new Date().getTime().toString().slice(-6)}`;

export const formatNumberToK = (views: number) => {
  if (views < 1000) return views;
  return `${(views / 1000).toFixed(1)}k`;
};

export const formatMinutesToHour = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainMinutes = minutes % 60;
  return `${hours}h${remainMinutes}p`;
};

export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("vi-VN");
};
export const timeAgo = (date: string | Date) => {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  if (years) return `${years} năm trước`;
  if (months) return `${months} tháng trước`;
  if (days) return `${days} ngày trước`;
  if (hours) return `${hours} giờ trước`;
  if (minutes) return `${minutes} phút trước`;
  return `${seconds} giây trước`;
};

export const getRepliesComment = (
  comments: ICommentItem[],
  parentId: string | ObjectId
) => {
  return comments.filter(
    (item) => item.parentId?.toString() === parentId.toString()
  );
};

export { manrope };
