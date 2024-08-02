import mongoose from "mongoose"
import Feedback from "../models/feedback.model.js"

export const addFeedback = async (req,res) => {
    try{
        const feedback = new Feedback({
            title : req.body.title,
            description : req.body.description,
            userId : new mongoose.Types.ObjectId(req.body.userId)
        })

        await feedback.save()

        if(!feedback) {
            return res.status(400).json({
                message : "Add feedback  Query Failed"
            })
        }
        res.status(200).json({
            message : "Feedback has been successfully added",
            data : feedback
        })
    }catch(err) {
        res.status(500).json({
            message : "Error occurs while adding Feedback",
            error : err
        })
        console.log(err)
    }
}