"use server";

import mongoose from "mongoose";

// singleton connection
let isConnected: boolean = false;
export const connectToDatabase = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not set");
  }
  if (isConnected) {
    console.log("MONGODB is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "ucademy",
    });
    isConnected = true;
    console.log("Using new database connection");
  } catch (error) {
    console.log("Error while connecting to database");
  }
};
