'use server';

import { FilterQuery } from 'mongoose';

import { CourseStatus } from '@/shared/constants';
import { connectToDatabase } from '@/shared/lib/mongoose';
import { QueryFilter } from '@/shared/types';

import CourseModel, { CourseModelProps } from '../models/course.model';

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
