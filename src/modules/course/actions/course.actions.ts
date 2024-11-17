'use server';

import { FilterQuery } from 'mongoose';
import { revalidatePath } from 'next/cache';

import { CourseStatus, RatingStatus } from '@/shared/constants';
import { connectToDatabase } from '@/shared/lib/mongoose';
import {
  CourseModel,
  LectureModel,
  LessonModel,
  RatingModel,
  UserModel,
} from '@/shared/schemas';
import {
  CourseItemData,
  CourseLessonData,
  CreateCourseParams,
  GetAllCourseParams,
  QueryFilter,
  UpdateCourseParams,
} from '@/shared/types';

export async function fetchCourses(
  params: QueryFilter,
): Promise<CourseItemData[] | undefined> {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof CourseModel> = {};

    if (search) {
      query.$or = [{ title: { $regex: search, $options: 'i' } }];
    }
    query.status = CourseStatus.APPROVED;
    const courses = await CourseModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });

    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCoursesOfUser(
  userId: string,
): Promise<CourseItemData[] | undefined> {
  try {
    connectToDatabase();
    const findUser = await UserModel.findOne({ clerkId: userId }).populate({
      path: 'courses',
      model: CourseModel,
      match: {
        status: CourseStatus.APPROVED,
      },
      populate: {
        path: 'lectures',
        model: LectureModel,
        select: 'lessons',
        populate: {
          path: 'lessons',
          model: LessonModel,
          select: 'slug',
        },
      },
    });

    if (!findUser) return;
    const courses = JSON.parse(JSON.stringify(findUser.courses));

    return courses;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCourseBySlug({
  slug,
}: {
  slug: string;
}): Promise<CourseItemData | undefined> {
  try {
    connectToDatabase();
    const findCourse = await CourseModel.findOne({ slug })
      .populate({
        path: 'lectures',
        model: LectureModel,
        select: '_id title',
        match: {
          _destroy: false,
        },
        populate: {
          path: 'lessons',
          model: LessonModel,
          match: {
            _destroy: false,
          },
        },
      })
      .populate({
        path: 'rating',
        model: RatingModel,
        match: {
          status: RatingStatus.ACTIVE,
        },
      });

    return JSON.parse(JSON.stringify(findCourse)) as CourseItemData;
  } catch (error) {
    console.log(error);
  }
}
export async function getAllCoursesPublic(
  params: GetAllCourseParams,
): Promise<CourseItemData[] | undefined> {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof CourseModel> = {};

    if (search) {
      query.$or = [{ title: { $regex: search, $options: 'i' } }];
    }
    query.status = CourseStatus.APPROVED;
    const courses = await CourseModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });

    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.log(error);
  }
}
export async function createCourse(params: CreateCourseParams) {
  try {
    connectToDatabase();
    const existCourse = await CourseModel.findOne({ slug: params.slug });

    if (existCourse) {
      return {
        success: false,
        message: 'Đường dẫn khóa học đã tồn tại!',
      };
    }
    const course = await CourseModel.create(params);

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
    const findCourse = await CourseModel.findOne({ slug: params.slug });

    if (!findCourse) return;
    await CourseModel.findOneAndUpdate(
      { slug: params.slug },
      params.updateData,
      {
        new: true,
      },
    );
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
    await CourseModel.findOneAndUpdate(
      { slug },
      {
        $inc: { views: 1 },
      },
    );
  } catch (error) {
    console.log(error);
  }
}
export async function getCourseLessonsInfo({
  slug,
}: {
  slug: string;
}): Promise<CourseLessonData | undefined> {
  try {
    connectToDatabase();
    const course: CourseItemData = await CourseModel.findOne({ slug })
      .select('lectures')
      .populate({
        path: 'lectures',
        select: 'lessons',
        populate: {
          path: 'lessons',
          select: 'duration',
        },
      });
    const lessons =
      course?.lectures.flatMap((lecture) => lecture.lessons) || [];
    const duration =
      lessons.reduce(
        (accumulator: number, current) => accumulator + current.duration,
        0,
      ) || 0;

    return {
      duration,
      lessons: lessons.length,
    };
  } catch (error) {
    console.log(error);
  }
}
