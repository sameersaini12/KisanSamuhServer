import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
    image_link : {
        type : String,
    },
    name : {
        type : String,
        required : true,
    },
    coins_required : {
        type : Number,
    }
},
{
    timestamps : true
})

const Reward = mongoose.model("Reward" , rewardSchema)
export default Reward