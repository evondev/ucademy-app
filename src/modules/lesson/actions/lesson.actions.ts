'use server';
import { revalidatePath } from 'next/cache';

import { connectToDatabase } from '@/shared/lib/mongoose';
import { CourseModel, LectureModel, LessonModel } from '@/shared/schemas';
import {
  CreateLessonParams,
  LessonModelProps,
  UpdateLessonParams,
} from '@/shared/types';

export async function createLesson(params: CreateLessonParams) {
  try {
    connectToDatabase();
    const findCourse = await CourseModel.findById(params.course);

    if (!findCourse) return;
    const findLecture = await LectureModel.findById(params.lecture);

    if (!findLecture) return;
    const newLesson = await LessonModel.create(params);

    findLecture.lessons.push(newLesson._id);
    await findLecture.save();
    revalidatePath(params.path || '/');
    if (!newLesson) return;

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}
export async function updateLesson(params: UpdateLessonParams) {
  try {
    connectToDatabase();
    const reponse = await LessonModel.findByIdAndUpdate(
      params.lessonId,
      params.updateData,
      { new: true },
    );

    revalidatePath(params.path || '/');
    if (!reponse) return;

    return {
      success: true,
    };
    revalidatePath(params.path || '/');
  } catch (error) {
    console.log(error);
  }
}
export async function getLessonBySlug({
  course,
  slug,
}: {
  slug: string;
  course: string;
}): Promise<LessonModelProps | undefined> {
  try {
    connectToDatabase();
    const findLesson = await LessonModel.findOne({
      slug,
      course,
    }).select('title video_url content');

    return findLesson;
  } catch (error) {
    console.log(error);
  }
}
export async function findAllLessons({
  course,
}: {
  course: string;
}): Promise<LessonModelProps[] | undefined> {
  try {
    connectToDatabase();
    const lessons = await LessonModel.find({
      course,
    }).select('title video_url content slug');

    return lessons;
  } catch (error) {
    console.log(error);
  }
}
export async function countLessonByCourseId({
  courseId,
}: {
  courseId: string;
}): Promise<number | undefined> {
  try {
    connectToDatabase();
    const count = await LessonModel.countDocuments({ course: courseId });

    return count || 0;
  } catch (error) {
    console.log(error);
  }
}
