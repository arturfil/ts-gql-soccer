import mongoose from "mongoose";
const url:string|any = process.env.MONGO_URL;

export const connectToDb = async () => {
    try {
        await mongoose.connect(url);
        console.log("Connected to mongo db ✅");
        
    } catch (error) {
        console.log("Hubo un error");
        process.exit(1)
        
    }
}