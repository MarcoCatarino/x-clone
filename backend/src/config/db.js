import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("Connection to DB Success ✅");
  } catch (error) {
    console.log("Error connecting to DB ❌");
    console.log(error);
    process.exit(1);
  }
};
