import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,},
    email:{type:String , required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false})

// if the model is already createdthat will be use , if the model is not created it will create the model mongoose.model("User", userSchema)
const userModel =  mongoose.models.User || mongoose.model("User", userSchema)

export default userModel;