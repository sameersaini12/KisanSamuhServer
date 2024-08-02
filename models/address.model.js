import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    address : {
        type : Array,
        default : []
    }
},
{
    timestamps : true
})

const Address = mongoose.model("Address" , addressSchema)
export default Address