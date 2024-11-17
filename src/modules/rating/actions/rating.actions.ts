'use server';

import { FilterQuery } from 'mongoose';
import { revalidatePath } from 'next/cache';

import { RatingStatus } from '@/shared/constants';
import { connectToDatabase } from '@/shared/lib/mongoose';
import { CourseModel, RatingModel } from '@/shared/schemas';
import { QueryFilter, RatingItemData } from '@/shared/types';
import { CreateRatingParams } from '@/shared/types/rating.type';

export async function createRating(
  params: CreateRatingParams,
): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    const newRating = await RatingModel.create(params);
    const findCourse = await CourseModel.findOne({
      _id: params.course,
    }).populate({
      path: 'rating',
      model: RatingModel,
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
    const findRating = await RatingModel.findOne({ user: userId });

    return findRating?._id ? true : false;
  } catch (error) {
    console.log(error);
  }
}
export async function updateRating(id: string): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    await RatingModel.findByIdAndUpdate(id, { status: RatingStatus.ACTIVE });
    revalidatePath('/admin/manage/rating');

    return true;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteRating(id: string): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    await RatingModel.findByIdAndDelete(id);
    revalidatePath('/admin/manage/rating');

    return true;
  } catch (error) {
    console.log(error);
  }
}
export async function fetchRatings(
  params: QueryFilter,
): Promise<RatingItemData[] | undefined> {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof RatingModel> = {};

    if (search) {
      query.$or = [{ content: { $regex: search, $options: 'i' } }];
    }
    if (status) {
      query.status = status;
    }
    const ratings = await RatingModel.find(query)
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
