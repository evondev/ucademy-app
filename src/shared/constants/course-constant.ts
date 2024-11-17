import { BadgeStatusVariant } from '../types';
import { CourseLevel, CourseStatus } from './enums';

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
