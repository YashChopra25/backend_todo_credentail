import mongoose from "mongoose";

export const Dbconnect = async () => {
    try {
        const DB_URL = process.env.MONGODB_URL;
        if (!DB_URL) {
            throw new Error("Unable to load MONGODB");
        }
        const connectionInstance = await mongoose.connect(DB_URL);
        console.log(`MongoDB Connected: ${connectionInstance.connection.host}`)
        return connectionInstance
    } catch (error) {
        console.log("Something went wrong in DbConnect", error)
        process.exit(0)
    }
}