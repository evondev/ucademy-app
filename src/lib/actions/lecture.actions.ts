'use server';
import { revalidatePath } from 'next/cache';

import Course from '@/database/course.model';
import Lecture from '@/database/lecture.model';
import { CreateLectureParams, UpdateLectureParams } from '@/types';

import { connectToDatabase } from '../mongoose';

export async function createLecture(params: CreateLectureParams) {
  try {
    connectToDatabase();
    const findCourse = await Course.findById(params.course);

    if (!findCourse) return;
    const newLecture = await Lecture.create(params);

    findCourse.lectures.push(newLecture._id);
    findCourse.save();
    revalidatePath(params.path || '/');

    return {
      sucess: true,
    };
  } catch (error) {}
}
export async function updateLecture(params: UpdateLectureParams) {
  try {
    connectToDatabase();
    const res = await Lecture.findByIdAndUpdate(
      params.lectureId,
      params.updateData,
      {
        new: true,
      },
    );

    revalidatePath(params.updateData.path || '/');
    if (!res) return;

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}
