import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    image : {
        type : String,
        required : true,
    }
}, {
    timestamps : true
})

const Category = mongoose.model("Category", CategorySchema)

export default Category