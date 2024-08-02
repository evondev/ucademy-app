"use server";

import Coupon, { ICoupon } from "@/database/coupon.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";

export async function createCoupon(params: any) {
  try {
    connectToDatabase();
    const newCoupon = await Coupon.create(params);
    revalidatePath("/manage/coupon");
    return JSON.parse(JSON.stringify(newCoupon));
  } catch (error) {
    console.log(error);
  }
}
export async function getCoupons(params: any): Promise<ICoupon[] | undefined> {
  try {
    connectToDatabase();
    const coupons = await Coupon.find(params);
    return JSON.parse(JSON.stringify(coupons));
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
