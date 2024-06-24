"use server";
import Course from "@/database/course.model";
import Lecture from "@/database/lecture.model";
import { TCreateLectureParams, TUpdateLectureParams } from "@/types";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";

export async function createLecture(params: TCreateLectureParams) {
  try {
    connectToDatabase();
    const findCourse = await Course.findById(params.course);
    if (!findCourse) return;
    const newLecture = await Lecture.create(params);
    findCourse.lectures.push(newLecture._id);
    findCourse.save();
    revalidatePath(params.path || "/");
    return {
      sucess: true,
    };
  } catch (error) {}
}
export async function updateLecture(params: TUpdateLectureParams) {
  try {
    connectToDatabase();
    console.log(params);
    const res = await Lecture.findByIdAndUpdate(
      params.lectureId,
      params.updateData,
      {
        new: true,
      }
    );
    console.log("updateLecture ~ res:", res);
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}
