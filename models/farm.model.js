import mongoose from "mongoose";

const FarmSchema = new mongoose.Schema({
    location : {
        type : String,
        required : true,
    },
    city : {
        type : String,
        required : true,
    },
    sowingDate : {
        type : Date,
        required : true,
    },
    farmSize : {
        type : String,
        required : true,
    },
    sizeIn : {
        type : String,
        default : 'acres'
    },
    cropName : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'User'
    }
}, {
    timestamps : true
})

const Farm = mongoose.model("Farm", FarmSchema)

export default Farm