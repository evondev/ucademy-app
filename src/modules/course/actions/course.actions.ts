'use server';

import { FilterQuery } from 'mongoose';

import Course from '@/database/course.model';
import Lecture from '@/database/lecture.model';
import Lesson from '@/database/lesson.model';
import UserSchema from '@/database/user.model';
import { CourseStatus } from '@/shared/constants';
import { connectToDatabase } from '@/shared/lib/mongoose';
import { CourseModel } from '@/shared/schemas';
import { CourseModelProps, QueryFilter } from '@/shared/types';

import { CourseItemData } from '../types';

export async function fetchCourses(
  params: QueryFilter,
): Promise<CourseModelProps[] | undefined> {
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
    const findUser = await UserSchema.findOne({ clerkId: userId }).populate({
      path: 'courses',
      model: Course,
      match: {
        status: CourseStatus.APPROVED,
      },
      populate: {
        path: 'lectures',
        model: Lecture,
        select: 'lessons',
        populate: {
          path: 'lessons',
          model: Lesson,
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
