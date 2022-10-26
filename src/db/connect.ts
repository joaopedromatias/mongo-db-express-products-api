import mongoose from "mongoose";

export const connectDb = async (connectionString: string) => {
    await mongoose.connect(connectionString);
};