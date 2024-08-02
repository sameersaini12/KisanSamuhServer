import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    orders : {
        type : Array,
        default : [],
    },
    amount : {
        type : Number,
        required: true,
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
    paymentStatus : {
        type : Boolean,
        default : false
    },
    paymentMode : {
        type : String,
        default : "COD"
    },
    buyingGroup : {
        type : String,
        default : "none"
    },
    deliveryDate : {
        type: Date,
        required : true
    }
},{
    timestamps : true
})

const Order = mongoose.model("Order" , orderSchema)
export default Order