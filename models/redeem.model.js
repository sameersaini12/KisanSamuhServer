import mongoose from "mongoose";

const redeemSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    rewardId : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'Reward'
    },
    address : {
        type : String,
    },
    status : {
        type : String,
        default : "ordered",
    },
    orderDate : {
        type : Date,
        default : Date.now(),
        get : (orderDate) => orderDate.getTime(),
        set : (orderDate) => new Date(orderDate)
    },
    deliveryDate : {
        type: Date,
    }
},
{
    timestamps : true
})

const Redeem = mongoose.model("Redeem" , redeemSchema)
export default Redeem