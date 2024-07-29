"use server";
import Order from "@/database/order.model";
import { TCreateOrderParams } from "@/types";
import { connectToDatabase } from "../mongoose";

export async function createOrder(params: TCreateOrderParams) {
  try {
    connectToDatabase();
    const newOrder = await Order.create(params);
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log(error);
  }
}
