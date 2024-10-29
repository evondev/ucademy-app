'use server';

import Course from '@/database/course.model';
import Rating from '@/database/rating.model';
import { CreateRatingParams, FilterData, RatingItem } from '@/types';
import { RatingStatus } from '@/types/enums';
import { FilterQuery } from 'mongoose';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../mongoose';

export async function createRating(
  params: CreateRatingParams,
): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    const newRating = await Rating.create(params);
    const findCourse = await Course.findOne({ _id: params.course }).populate({
      path: 'rating',
      model: Rating,
    });
    if (findCourse.rating) {
      await findCourse.rating.push(newRating._id);
      await findCourse.save();
    }
    if (!newRating) return false;
    return true;
  } catch (error) {
    console.log(error);
  }
}

export async function getRatingByUserId(
  userId: string,
): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    const findRating = await Rating.findOne({ user: userId });
    return findRating?._id ? true : false;
  } catch (error) {
    console.log(error);
  }
}
export async function updateRating(id: string): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    await Rating.findByIdAndUpdate(id, { status: RatingStatus.ACTIVE });
    revalidatePath('/admin/manage/rating');
    return true;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteRating(id: string): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    await Rating.findByIdAndDelete(id);
    revalidatePath('/admin/manage/rating');
    return true;
  } catch (error) {
    console.log(error);
  }
}
export async function getRatings(
  params: FilterData,
): Promise<RatingItem[] | undefined> {
  try {
    connectToDatabase();
    const { page = 1, limit = 10, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Rating> = {};
    if (search) {
      query.$or = [{ content: { $regex: search, $options: 'i' } }];
    }
    if (status) {
      query.status = status;
    }
    const ratings = await Rating.find(query)
      .populate({
        path: 'course',
        select: 'title slug',
      })
      .populate({
        path: 'user',
        select: 'name',
      })
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });
    return JSON.parse(JSON.stringify(ratings));
  } catch (error) {
    console.log(error);
  }
}
