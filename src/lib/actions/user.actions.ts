"use server";

import User from "@/database/user.model";
import { TCreateUserParams } from "@/types";
import { connectToDatabase } from "../mongoose";

export default async function createUser(params: TCreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(params);
    return newUser;
  } catch (error) {
    console.log(error);
  }
}
