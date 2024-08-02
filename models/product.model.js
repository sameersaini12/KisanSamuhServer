import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title : {
        type : String,
    },
    brand : {
        type : String,
    },
    about : {
        type : Array,
        default : []
    },
    technicalDetails : {
        type : Array,
        default : []
    },
    features : {
        type : Array,
        default : []
    },
    howToUse : {
        type : Array,
        default : []
    },
    additionalInformation : {
        type : Array,
        default : []
    },
    image: {
        type : Array,
        default : []
    },
    categories : {
        type : Array,
        default : []
    },
    price : {
        type : Array,
        default : []
    },
    discount : {
        type : String
    },
    isAvailable : {
        type : Boolean,
        default : true
    }
},
{
    timestamps : true
})

const Product = mongoose.model("Product" , productSchema)
export default Product