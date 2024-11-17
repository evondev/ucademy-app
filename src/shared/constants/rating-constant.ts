import { BadgeStatusVariant, RatingIcon } from '../types';
import { RatingStatus } from './enums';

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
