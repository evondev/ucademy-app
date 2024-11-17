'use server';
import { revalidatePath } from 'next/cache';

import { connectToDatabase } from '@/shared/lib/mongoose';
import { CourseModel, LectureModel } from '@/shared/schemas';
import { CreateLectureParams, UpdateLectureParams } from '@/shared/types';

export async function createLecture(params: CreateLectureParams) {
  try {
    connectToDatabase();
    const findCourse = await CourseModel.findById(params.course);

    if (!findCourse) return;
    const newLecture = await LectureModel.create(params);

    findCourse.lectures.push(newLecture._id);
    findCourse.save();
    revalidatePath(params.path || '/');

    return {
      sucess: true,
    };
  } catch (error) {
    console.log(error);
  }
}
export async function updateLecture(params: UpdateLectureParams) {
  try {
    connectToDatabase();
    const response = await LectureModel.findByIdAndUpdate(
      params.lectureId,
      params.updateData,
      {
        new: true,
      },
    );

    revalidatePath(params.updateData.path || '/');
    if (!response) return;

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}
