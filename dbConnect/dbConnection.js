import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Database has been connected successfully")
    }catch(err) {
        console.log(err);
    }
}

export default dbConnect