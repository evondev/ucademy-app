"use server";
import Course, { ICourse } from "@/database/course.model";
import Lecture from "@/database/lecture.model";
import Lesson from "@/database/lesson.model";
import Rating from "@/database/rating.model";
import {
  StudyCoursesProps,
  TCourseUpdateParams,
  TCreateCourseParams,
  TFilterData,
  TGetAllCourseParams,
  TUpdateCourseParams,
} from "@/types";
import { ECourseStatus, ERatingStatus } from "@/types/enums";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
// fetching
export async function getAllCoursesPublic(
  params: TGetAllCourseParams
): Promise<StudyCoursesProps[] | undefined> {
  try {
    connectToDatabase();
    const { page = 1, limit = 10, search } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Course> = {};
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }];
    }
    query.status = ECourseStatus.APPROVED;
    const courses = await Course.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.log(error);
  }
}
export async function getAllCourses(
  params: TFilterData
): Promise<ICourse[] | undefined> {
  try {
    connectToDatabase();
    const { page = 1, limit = 10, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Course> = {};
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }];
    }
    if (status) {
      query.status = status;
    }
    const courses = await Course.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.log(error);
  }
}
export async function getCourseBySlug({
  slug,
}: {
  slug: string;
}): Promise<TCourseUpdateParams | undefined> {
  try {
    connectToDatabase();
    const findCourse = await Course.findOne({ slug })
      .populate({
        path: "lectures",
        model: Lecture,
        select: "_id title",
        match: {
          _destroy: false,
        },
        populate: {
          path: "lessons",
          model: Lesson,
          match: {
            _destroy: false,
          },
        },
      })
      .populate({
        path: "rating",
        model: Rating,
        match: {
          status: ERatingStatus.ACTIVE,
        },
      });
    return findCourse;
  } catch (error) {
    console.log(error);
  }
}
// CRUD
export async function createCourse(params: TCreateCourseParams) {
  try {
    connectToDatabase();
    const existCourse = await Course.findOne({ slug: params.slug });
    if (existCourse) {
      return {
        success: false,
        message: "Đường dẫn khóa học đã tồn tại!",
      };
    }
    const course = await Course.create(params);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(course)),
    };
  } catch (error) {
    console.log(error);
  }
}
export async function updateCourse(params: TUpdateCourseParams) {
  console.log("updateCourse ~ params:", params);
  try {
    connectToDatabase();
    const findCourse = await Course.findOne({ slug: params.slug });
    if (!findCourse) return;
    await Course.findOneAndUpdate({ slug: params.slug }, params.updateData, {
      new: true,
    });
    revalidatePath(params.path || "/");
    return {
      success: true,
      message: "Cập nhật khóa học thành công!",
    };
  } catch (error) {
    console.log(error);
  }
}
export async function updateCourseView({ slug }: { slug: string }) {
  try {
    connectToDatabase();
    await Course.findOneAndUpdate(
      { slug },
      {
        $inc: { views: 1 },
      }
    );
  } catch (error) {}
}
export async function getCourseLessonsInfo({ slug }: { slug: string }): Promise<
  | {
      duration: number;
      lessons: number;
    }
  | undefined
> {
  try {
    connectToDatabase();
    const course = await Course.findOne({ slug })
      .select("lectures")
      .populate({
        path: "lectures",
        select: "lessons",
        populate: {
          path: "lessons",
          select: "duration",
        },
      });
    const lessons = course?.lectures.map((l: any) => l.lessons).flat();
    const duration = lessons.reduce(
      (acc: number, cur: any) => acc + cur.duration,
      0
    );
    return {
      duration,
      lessons: lessons.length,
    };
  } catch (error) {}
}
