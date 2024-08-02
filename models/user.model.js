import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
    },
    phone : {
        type : String,
        unique : true,
    },
    otp : {
        type: String,
    },
    otpExpires : {
        type : Date,
        default : Date.now(),
        get : (otpExpires) => otpExpires.getTime(),
        set : (otpExpires) => new Date(otpExpires)
    },
    isAdmin : {
        type : Boolean,
        default : false,
    }
},
{
    timestamps : true
})

const User = mongoose.model("User" , userSchema)
export default User