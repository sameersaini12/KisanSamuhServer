import mongoose from "mongoose"

const FeedbackSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    userId : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true
    }
}, {
    timestamps : true
})

const Feedback = mongoose.model("Feedback" , FeedbackSchema)
export default Feedback