import mongoose from "mongoose"

const otpSchema = new mongoose.Schema({
    phone : {
        type : String,
        required : true,
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
    verified : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})

const Otp = mongoose.model("Otp" , otpSchema)
export default Otp 