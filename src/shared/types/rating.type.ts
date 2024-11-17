import { RatingStatus } from '../constants';

export type CreateRatingParams = {
  rate: number;
  content: string;
  user: string;
  course: string;
};
export type RatingItem = {
  _id: string;
  content: string;
  rate: number;
  created_at: string;
  course: {
    title: string;
    slug: string;
  };
  user: {
    name: string;
  };
  status: RatingStatus;
};
