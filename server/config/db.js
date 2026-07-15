import mongoose from "mongoose";

export const connectDB = async () => {
   await mongoose.connect("mongodb+srv://Rhymes:zMR5qSJlWtx9t9CK@cluster0.i5nj2tj.mongodb.net/?appName=Cluster0").then(() =>{
    console.log("DB connected successfully");
   })
};