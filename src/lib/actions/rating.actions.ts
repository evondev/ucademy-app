"use server";

import Rating from "@/database/rating.model";
import { connectToDatabase } from "../mongoose";

export async function createRating(params: any): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    const newRating = await Rating.create(params);
    if (!newRating) return false;
    return true;
  } catch (error) {
    console.log(error);
  }
}
