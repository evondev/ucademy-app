'use server';
import { revalidatePath } from 'next/cache';

import Course from '@/database/course.model';
import Lecture from '@/database/lecture.model';
import Lesson, { LessonProps } from '@/database/lesson.model';
import { CreateLessonParams, UpdateLessonParams } from '@/types';

import { connectToDatabase } from '../mongoose';

export async function createLesson(params: CreateLessonParams) {
  try {
    connectToDatabase();
    const findCourse = await Course.findById(params.course);

    if (!findCourse) return;
    const findLecture = await Lecture.findById(params.lecture);

    if (!findLecture) return;
    const newLesson = await Lesson.create(params);

    findLecture.lessons.push(newLesson._id);
    await findLecture.save();
    revalidatePath(params.path || '/');
    if (!newLesson) return;

    return {
      success: true,
    };
  } catch (error) {}
}
export async function updateLesson(params: UpdateLessonParams) {
  try {
    connectToDatabase();
    const res = await Lesson.findByIdAndUpdate(
      params.lessonId,
      params.updateData,
      { new: true },
    );

    revalidatePath(params.path || '/');
    if (!res) return;

    return {
      success: true,
    };
    revalidatePath(params.path || '/');
  } catch (error) {}
}
export async function getLessonBySlug({
  course,
  slug,
}: {
  slug: string;
  course: string;
}): Promise<LessonProps | undefined> {
  try {
    connectToDatabase();
    const findLesson = await Lesson.findOne({
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
}): Promise<LessonProps[] | undefined> {
  try {
    connectToDatabase();
    const lessons = await Lesson.find({
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
    const count = await Lesson.countDocuments({ course: courseId });

    return count || 0;
  } catch (error) {
    console.log(error);
  }
}
