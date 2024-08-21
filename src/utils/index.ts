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

export { manrope };
