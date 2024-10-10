"use server";

import Course from "@/database/course.model";
import Lecture from "@/database/lecture.model";
import Lesson from "@/database/lesson.model";
import User from "@/database/user.model";
import { CreateUserParams } from "@/types";
import { CourseStatus } from "@/types/enums";
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "../mongoose";

export async function createUser(params: CreateUserParams) {
  try {
    connectToDatabase();
    const user = await User.create(params);
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
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) return null;
    return findUser;
  } catch (error) {
    console.log(error);
  }
}
export async function getUserCourses(): Promise<Course[] | undefined | null> {
  try {
    connectToDatabase();
    const { userId } = auth();
    const findUser = await User.findOne({ clerkId: userId }).populate({
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
