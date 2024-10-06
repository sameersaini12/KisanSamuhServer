import mongoose from "mongoose";

const adminSettingSchema = new mongoose.Schema({
    deliveryCost : {
        type : Number,
    }
},
{
    timestamps : true
})

const AdminSetting = mongoose.model("AdminSetting" , adminSettingSchema)
export default AdminSetting