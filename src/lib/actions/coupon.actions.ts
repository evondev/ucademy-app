"use server";

import Coupon from "@/database/coupon.model";
import {
  TCouponItem,
  TCouponParams,
  TCreateCouponParams,
  TFilterData,
  TUpdateCouponParams,
} from "@/types";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";

export async function createCoupon(params: TCreateCouponParams) {
  try {
    connectToDatabase();
    const existingCoupon = await Coupon.findOne({ code: params.code });
    if (existingCoupon?.code) {
      return { error: "Mã giảm giá đã tồn tại!" };
    }
    const couponRegex = /^[A-Z0-9]{3,10}$/;
    if (!couponRegex.test(params.code)) {
      return { error: "Mã giảm giá không hợp lệ" };
    }
    const newCoupon = await Coupon.create(params);
    revalidatePath("/manage/coupon");
    return JSON.parse(JSON.stringify(newCoupon));
  } catch (error) {
    console.log(error);
  }
}
export async function updateCoupon(params: TUpdateCouponParams) {
  try {
    connectToDatabase();
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      params._id,
      params.updateData
    );
    revalidatePath("/manage/coupon");
    return JSON.parse(JSON.stringify(updatedCoupon));
  } catch (error) {
    console.log(error);
  }
}
export async function getCoupons(
  params: TFilterData
): Promise<TCouponItem[] | undefined> {
  try {
    connectToDatabase();
    const { page = 1, limit = 10, search, active } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Coupon> = {};
    if (search) {
      query.$or = [{ code: { $regex: search, $options: "i" } }];
    }
    // query.active = active;
    const coupons = await Coupon.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });
    return JSON.parse(JSON.stringify(coupons));
  } catch (error) {
    console.log(error);
  }
}
export async function getCouponByCode(
  params: any
): Promise<TCouponParams | undefined> {
  try {
    connectToDatabase();
    const findCoupon = await Coupon.findOne({
      code: params.code,
    }).populate({
      path: "courses",
      select: "_id title",
    });
    const coupon = JSON.parse(JSON.stringify(findCoupon));
    return coupon;
  } catch (error) {
    console.log(error);
  }
}
export async function getValidateCoupon(
  params: any
): Promise<TCouponParams | undefined> {
  try {
    connectToDatabase();
    const findCoupon = await Coupon.findOne({
      code: params.code,
    }).populate({
      path: "courses",
      select: "_id title",
    });
    const coupon = JSON.parse(JSON.stringify(findCoupon));
    const couponCourses = coupon?.courses.map((course: any) => course._id);
    let isActive = true;
    if (!couponCourses.includes(params.courseId)) isActive = false;
    if (!coupon?.active) isActive = false;
    if (coupon?.used >= coupon?.limit) isActive = false;
    if (coupon?.start_date && new Date(coupon?.start_date) > new Date())
      isActive = false;
    if (coupon?.end_date && new Date(coupon?.end_date) < new Date())
      isActive = false;
    return isActive ? coupon : undefined;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteCoupon(code: string) {
  try {
    connectToDatabase();
    await Coupon.findOneAndDelete({ code });
    revalidatePath("/manage/coupon");
  } catch (error) {
    console.log(error);
  }
}
