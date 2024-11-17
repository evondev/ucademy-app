/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

import {
  IconComment,
  IconCoupon,
  IconExplore,
  IconOrder,
  IconPlay,
  IconStar,
  IconStudy,
  IconUsers,
} from '@/shared/components/icons';
import { MenuField, RatingIcon } from '@/types';

import { BadgeStatusVariant } from '../types';
import {
  CouponType,
  CourseLevel,
  CourseStatus,
  OrderStatus,
  RatingStatus,
} from './enums';

export const menuItems: MenuField[] = [
  {
    url: '/',
    title: 'Khám phá',
    icon: <IconPlay className="size-5" />,
  },
  {
    url: '/study',
    title: 'Khu vực học tập',
    icon: <IconStudy className="size-5" />,
  },
  {
    url: '/manage/course',
    title: 'Quản lý khóa học',
    icon: <IconExplore className="size-5" />,
  },
  {
    url: '/manage/member',
    title: 'Quản lý thành viên',
    icon: <IconUsers className="size-5" />,
  },
  {
    url: '/manage/order',
    title: 'Quản lý đơn hàng',
    icon: <IconOrder className="size-5" />,
  },
  {
    url: '/manage/coupon',
    title: 'Quản lý coupon',
    icon: <IconCoupon className="size-5" />,
  },
  {
    url: '/manage/rating',
    title: 'Quản lý đánh giá',
    icon: <IconStar className="size-5" />,
  },
  {
    url: '/manage/comment',
    title: 'Quản lý bình luận',
    icon: <IconComment className="size-5" />,
  },
];
export const courseStatus: {
  title: string;
  value: CourseStatus;
  className?: string;
  variant?: BadgeStatusVariant;
}[] = [
  {
    title: 'Đã duyệt',
    value: CourseStatus.APPROVED,
    className: 'text-green-500 bg-green-500',
    variant: 'success',
  },
  {
    title: 'Chờ duyệt',
    value: CourseStatus.PENDING,
    className: 'text-orange-500 bg-orange-500',
    variant: 'warning',
  },
  {
    title: 'Từ chối',
    value: CourseStatus.REJECTED,
    className: 'text-red-500 bg-red-500',
    variant: 'danger',
  },
];
export const courseLevel: {
  title: string;
  value: CourseLevel;
}[] = [
  {
    title: 'Dễ',
    value: CourseLevel.BEGINNER,
  },
  {
    title: 'Trung bình',
    value: CourseLevel.INTERMEDIATE,
  },
  {
    title: 'Khó',
    value: CourseLevel.ADVANCED,
  },
];
export const courseLevelTitle: Record<CourseLevel, string> = {
  [CourseLevel.BEGINNER]: 'Dễ',
  [CourseLevel.INTERMEDIATE]: 'Trung bình',
  [CourseLevel.ADVANCED]: 'Khó',
};
export const commonClassNames = {
  status:
    'bg-opacity-10 border border-current rounded-md font-medium px-3 py-1 text-xs whitespace-nowrap',
  action:
    'size-8 rounded-md border flex items-center justify-center p-2  text-gray-500 hover:border-opacity-80 dark:bg-transparent borderDarkMode dark:hover:border-opacity-20',
  paginationButton:
    'size-10 rounded-md borderDarkMode bgDarkMode border flex items-center justify-center hover:border-primary transition-all hover:text-primary p-2.5',
  btnPrimary:
    'flex items-center justify-center w-full mt-10 rounded-lg text-white font-bold bg-primary h-12 button-primary',
};
export const editorOptions = (field: any, theme: any) => ({
  initialValue: '',
  onBlur: field.onBlur,
  onEditorChange: (content: any) => field.onChange(content),
  init: {
    codesample_global_prismjs: true,
    skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
    height: 300,
    menubar: false,
    plugins: [
      'advlist',
      'autolink',
      'lists',
      'link',
      'image',
      'charmap',
      'preview',
      'anchor',
      'searchreplace',
      'visualblocks',
      'codesample',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'heading',
    ],
    toolbar:
      'undo redo | ' +
      'codesample | bold italic forecolor | alignleft aligncenter |' +
      'alignright alignjustify | bullist numlist |' +
      'image |' +
      'h1 h2 h3 h4 h5 h6 | preview | fullscreen |' +
      'link',
    content_style:
      "@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');body { font-family: Manrope,Helvetica,Arial,sans-serif; font-size:14px; line-height: 2; padding-bottom: 32px; } img { max-width: 100%; height: auto; display: block; margin: 0 auto; };",
  },
});
export const lastLessonKey = 'lastLesson';
export const orderStatus: {
  title: string;
  value: OrderStatus;
  variant: BadgeStatusVariant;
  className?: string;
}[] = [
  {
    title: 'Đã duyệt',
    value: OrderStatus.COMPLETED,
    className: 'text-green-500 bg-green-500',
    variant: 'success',
  },
  {
    title: 'Chờ duyệt',
    value: OrderStatus.PENDING,
    className: 'text-orange-500 bg-orange-500',
    variant: 'warning',
  },
  {
    title: 'Đã hủy',
    value: OrderStatus.CANCELED,
    className: 'text-red-500 bg-red-500',
    variant: 'danger',
  },
];
export const couponTypes: {
  title: string;
  value: CouponType;
}[] = [
  {
    title: 'Phần trăm',
    value: CouponType.PERCENT,
  },
  {
    title: 'Giá trị',
    value: CouponType.AMOUNT,
  },
];
export const couponFormSchema = z.object({
  title: z
    .string({
      message: 'Tiêu đề không được để trống',
    })
    .min(10, 'Tiêu đề phải có ít nhất 10 ký tự'),
  code: z
    .string({
      message: 'Mã giảm giá không được để trống',
    })
    .min(3, 'Mã giảm giá phải có ít nhất 3 ký tự')
    .max(10, 'Mã giảm giá không được quá 10 ký tự'),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  active: z.boolean().optional(),
  value: z.string().optional(),
  type: z.enum([CouponType.AMOUNT, CouponType.PERCENT]),
  courses: z.array(z.string()).optional(),
  limit: z.number().optional(),
});
export const ratingList: {
  title: RatingIcon;
  value: number;
}[] = [
  {
    title: 'awesome',
    value: 5,
  },
  {
    title: 'good',
    value: 4,
  },
  {
    title: 'meh',
    value: 3,
  },
  {
    title: 'bad',
    value: 2,
  },
  {
    title: 'terrible',
    value: 1,
  },
];
export const ratingStatus: {
  title: string;
  value: RatingStatus;
  variant?: BadgeStatusVariant;
}[] = [
  {
    title: 'Đã duyệt',
    value: RatingStatus.ACTIVE,
    variant: 'success',
  },
  {
    title: 'Chờ duyệt',
    value: RatingStatus.UNACTIVE,
    variant: 'warning',
  },
];
export const allValue = 'ALL';
export const ITEMS_PER_PAGE = 10;
export const couponStatuses = [
  {
    title: 'Đang kích hoạt',
    value: 1,
  },
  {
    title: 'Chưa kích hoạt',
    value: 0,
  },
];
export const MAX_COMMENT_LEVEL = 3;
