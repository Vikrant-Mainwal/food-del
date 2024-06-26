import mongoose from "mongoose";


export const connectDb = async()=>{
    await mongoose.connect('mongodb+srv://Vikrant1301:43211234@cluster0.plix4kh.mongodb.net/tomato').then(()=>console.log("DB connected"))
}