"use server";

import Course, { CourseProps } from "@/database/course.model";
import Lecture from "@/database/lecture.model";
import Lesson from "@/database/lesson.model";
import UserSchema, { User } from "@/database/user.model";
import { CreateUserParams } from "@/types";
import { CourseStatus } from "@/types/enums";
import { connectToDatabase } from "../mongoose";

export async function createUser(params: CreateUserParams) {
  try {
    connectToDatabase();
    const user = await UserSchema.create(params);
    return user;
  } catch (error) {
    console.log(error);
  }
}
export async function getUserInfo({
  userId,
}: {
  userId: string;
}): Promise<User | null | undefined> {
  try {
    connectToDatabase();
    const findUser = await UserSchema.findOne({ clerkId: userId });
    if (!findUser) return null;
    return findUser;
  } catch (error) {
    console.log(error);
  }
}
export async function getUserCourses(
  userId: string
): Promise<CourseProps[] | undefined | null> {
  try {
    connectToDatabase();
    const findUser = await UserSchema.findOne({ clerkId: userId }).populate({
      path: "courses",
      model: Course,
      match: {
        status: CourseStatus.APPROVED,
      },
      populate: {
        path: "lectures",
        model: Lecture,
        select: "lessons",
        populate: {
          path: "lessons",
          model: Lesson,
          select: "slug",
        },
      },
    });
    if (!findUser) return null;
    return findUser.courses;
  } catch (error) {
    console.log(error);
  }
}
