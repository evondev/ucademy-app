'use server';
import { FilterQuery } from 'mongoose';
import { revalidatePath } from 'next/cache';

import Course, { CourseProps } from '@/database/course.model';
import Lecture from '@/database/lecture.model';
import Lesson from '@/database/lesson.model';
import Rating from '@/database/rating.model';
import {
  CourseUpdateParams,
  CreateCourseParams,
  FilterData,
  GetAllCourseParams,
  StudyCoursesProps,
  UpdateCourseParams,
} from '@/types';
import { CourseStatus, RatingStatus } from '@/types/enums';

import { connectToDatabase } from '../mongoose';
// fetching
export async function getAllCoursesPublic(
  params: GetAllCourseParams,
): Promise<StudyCoursesProps[] | undefined> {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Course> = {};

    if (search) {
      query.$or = [{ title: { $regex: search, $options: 'i' } }];
    }
    query.status = CourseStatus.APPROVED;
    const courses = await Course.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });

    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.log(error);
  }
}
export async function getAllCourses(
  params: FilterData,
): Promise<CourseProps[] | undefined> {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Course> = {};

    if (search) {
      query.$or = [{ title: { $regex: search, $options: 'i' } }];
    }
    if (status) {
      query.status = status;
    }
    const courses = await Course.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });

    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.log(error);
  }
}
export async function getCourseBySlug({
  slug,
}: {
  slug: string;
}): Promise<CourseUpdateParams | undefined> {
  try {
    connectToDatabase();
    const findCourse = await Course.findOne({ slug })
      .populate({
        path: 'lectures',
        model: Lecture,
        select: '_id title',
        match: {
          _destroy: false,
        },
        populate: {
          path: 'lessons',
          model: Lesson,
          match: {
            _destroy: false,
          },
        },
      })
      .populate({
        path: 'rating',
        model: Rating,
        match: {
          status: RatingStatus.ACTIVE,
        },
      });

    return findCourse;
  } catch (error) {
    console.log(error);
  }
}
// CRUD
export async function createCourse(params: CreateCourseParams) {
  try {
    connectToDatabase();
    const existCourse = await Course.findOne({ slug: params.slug });

    if (existCourse) {
      return {
        success: false,
        message: 'Đường dẫn khóa học đã tồn tại!',
      };
    }
    const course = await Course.create(params);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(course)),
    };
  } catch (error) {
    console.log(error);
  }
}
export async function updateCourse(params: UpdateCourseParams) {
  console.log('updateCourse ~ params:', params);
  try {
    connectToDatabase();
    const findCourse = await Course.findOne({ slug: params.slug });

    if (!findCourse) return;
    await Course.findOneAndUpdate({ slug: params.slug }, params.updateData, {
      new: true,
    });
    revalidatePath(params.path || '/');

    return {
      success: true,
      message: 'Cập nhật khóa học thành công!',
    };
  } catch (error) {
    console.log(error);
  }
}
export async function updateCourseView({ slug }: { slug: string }) {
  try {
    connectToDatabase();
    await Course.findOneAndUpdate(
      { slug },
      {
        $inc: { views: 1 },
      },
    );
  } catch {}
}
export async function getCourseLessonsInfo({ slug }: { slug: string }): Promise<
  | {
      duration: number;
      lessons: number;
    }
  | undefined
> {
  try {
    connectToDatabase();
    const course = await Course.findOne({ slug })
      .select('lectures')
      .populate({
        path: 'lectures',
        select: 'lessons',
        populate: {
          path: 'lessons',
          select: 'duration',
        },
      });
    const lessons = course?.lectures.flatMap((l: any) => l.lessons);
    const duration = lessons.reduce(
      (accumulator: number, current: any) => accumulator + current.duration,
      0,
    );

    return {
      duration,
      lessons: lessons.length,
    };
  } catch {}
}
