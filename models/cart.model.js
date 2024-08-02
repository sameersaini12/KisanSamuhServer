import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    product : [
        {
            productId : {
                type : String,
            },
            quantity : {
                type : Number,
                default : 1,
            },
        }
    ]
},{
    timestamps : true
})

const Cart = mongoose.model("Cart" , cartSchema)
export default Cart