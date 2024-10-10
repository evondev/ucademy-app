import { Comment } from "@/database/comment.model";
import { Coupon } from "@/database/coupon.model";
import { Course } from "@/database/course.model";
import { LessonProps } from "@/database/lesson.model";
import { CouponType } from "./enums";

export type ActiveLinkProps = {
  url: string;
  children: React.ReactNode;
};
export type MenuItem = {
  url: string;
  title: string;
  icon: React.ReactNode;
  onlyIcon?: boolean;
};
// User
export type CreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
};
// Course
export type CreateCourseParams = {
  title: string;
  slug: string;
  author: string;
};
export type UpdateCourseParams = {
  slug: string;
  updateData: Partial<Course>;
  path?: string;
};
export type UpdateCourseLecture = {
  _id: string;
  title: string;
  lessons: LessonProps[];
};
export interface CourseUpdateParams extends Omit<Course, "lectures"> {
  lectures: UpdateCourseLecture[];
}
export type GetAllCourseParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
};
// Lecture
export type CreateLectureParams = {
  course: string;
  title?: string;
  order?: number;
  path?: string;
};
export type UpdateLectureParams = {
  lectureId: string;
  updateData: {
    title?: string;
    order?: number;
    _destroy?: boolean;
    path?: string;
  };
};
// Lesson
export type CreateLessonParams = {
  lecture: string;
  course: string;
  title?: string;
  order?: number;
  path?: string;
  slug?: string;
};
export type UpdateLessonParams = {
  lessonId: string;
  updateData: {
    title?: string;
    slug?: string;
    duration?: number;
    video_url?: string;
    content?: string;
  };
  path?: string;
};
// History
export type CreateHistoryParams = {
  course: string;
  lesson: string;
  checked: boolean | string;
  path: string;
};
// Order
export type CreateOrderParams = {
  code: string;
  course: string;
  user: string;
  total?: number;
  amount?: number;
  discount?: number;
  coupon?: string;
};
// Coupon
export type CreateCouponParams = {
  title: string;
  code: string;
  type: CouponType;
  value?: number;
  start_date?: Date;
  end_date?: Date;
  active?: boolean;
  limit?: number;
  courses?: string[];
};
export type UpdateCouponParams = {
  _id: string;
  updateData: Partial<CreateCouponParams>;
};
export type CouponParams = Omit<Coupon, "courses"> & {
  courses: {
    _id: string;
    title: string;
  }[];
};
export interface StudyCoursesProps extends Omit<Course, "lectures"> {
  lectures: {
    lessons: {
      slug: string;
    }[];
  }[];
}
export type RatingIcon = "awesome" | "good" | "meh" | "bad" | "terrible";
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
export type CouponItem = Omit<Coupon, "_id" | "courses">;
// Filter, pagination
export type FilterData = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  active?: boolean;
};
// Comment
export interface CommentItem extends Omit<Comment, "user"> {
  user: {
    name: string;
    avatar: string;
  };
}
