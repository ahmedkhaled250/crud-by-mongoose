import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:Number,
    phone:String,
    active:{
        type:Boolean,
        default:false,
    }
},{
    timestamps:true
})
const userModel = mongoose.model('User',userSchema)
export default userModel