import mongoose, { Types } from "mongoose";
import Redeem from "../models/redeem.model.js";
import Reward from "../models/reward.model.js";

export const addReward = async (req,res) => {
    try {
        const newReward = new Reward({
            image_link : req.body.image_link,
            name : req.body.name,
            coins_required : req.body.coins_required
        });
        await newReward.save();
        if(!newReward) {
            return res.status(200).json({
                message : "Error occurs while adding new Reward",
            })
        }
        res.status(200).json({
            message : "New Reward has been added successfully",
            data : newReward
        })
    }catch(err) {
        res.status(500).json({
            message : "Error occurs while adding reward",
            error : err
        })
        console.log(err)
    }
}

export const getRewardsList = async (req,res) => {
    try  {
        const rewardList = await Reward.find()
        if(!rewardList) {
            return res.status(400).json({
                message : "Error occurs while fetching rewars"
            })
        }
        res.status(200).json({
            message : "Rewards has been fetched successfully",
            data : rewardList
        })
    }catch(err) {
        res.status(500).json({
            message : "Error occurs while fetching rewards",
            error : err
        })
        console.log(err)
    }
}

export const redeemReward = async (req,res) => {
    try {
        const currentDate = new Date();

        const RedeemProduct = new Redeem({
            userId : new mongoose.Types.ObjectId(req.body.userId),
            rewardId : new mongoose.Types.ObjectId(req.body.rewardId),
            address : req.body.address,
            orderDate : currentDate,
        })

        await RedeemProduct.save()

        if(!RedeemProduct) {
            return res.status(400).json({
                message : "Redeem item query failed"
            })
        }
        res.status(200).json({
            message : "Redeem item sucessfully",
            data : RedeemProduct
        })
    }catch(err) {
        res.status(500).json({
            message : "Error occurs while redeem rewards",
            error : err
        })
        console.log(err)
    }
}

export const updateRedeemReward = async (req,res) => {
    try {
        const currentDate = new Date();

        const RedeemProduct = await Redeem.findByIdAndUpdate(
            req.params.id,
            {
                $set : {
                    deliveryDate : currentDate,
                    status : req.body.status
                }
            },
            {
                new  :true
            }
        )

        await RedeemProduct.save()

        if(!RedeemProduct) {
            return res.status(400).json({
                message : "Redeem item query failed"
            })
        }
        res.status(200).json({
            message : "Redeem item sucessfully",
            data : RedeemProduct
        })
    }catch(err) {
        res.status(500).json({
            message : "Error occurs while redeem rewards",
            error : err
        })
        console.log(err)
    }
}

export const getAllUserRedeemOrders = async (req,res) => {
    try {
        // const orders = await Redeem.find({userId : req.params.id}).sort({createdAt : -1})
        // console.log(req.params.id)

        const {ObjectId} = Types

        const orders = await Redeem.aggregate([
            {
                $match : {
                    userId : new ObjectId(req.params.id)
                }
            },
            {
                $lookup : {
                    from : "rewards",
                    localField : "rewardId",
                    foreignField : "_id",
                    as : "rewardDetails"
                }
            }
        ])
        // console.log(orders)

        if(!orders) {
            return res.status(400).json({
                message : "Fetching Redeem Orders Query Failed"
            })
        }
        res.status(200).json({
            message : "Redeem orders has been successfully fetched",
            data : orders
        })
    }catch(err) {
        res.status(500).json({
            message : "Error occurs while fetching redeem orders",
            error : err
        })
        console.log(err)
    }
}

export const getAllAdminRedeemOrders = async (req,res) => {
    try {

        const {ObjectId} = Types

        const orders = await Redeem.aggregate([
            {
                $lookup : {
                    from : "rewards",
                    localField : "rewardId",
                    foreignField : "_id",
                    as : "rewardDetails"
                }
            }
        ])
        // console.log(orders)

        if(!orders) {
            return res.status(400).json({
                message : "Fetching Redeem Orders Query Failed"
            })
        }
        res.status(200).json({
            message : "Redeem orders has been successfully fetched",
            data : orders
        })
    }catch(err) {
        res.status(500).json({
            message : "Error occurs while fetching redeem orders",
            error : err
        })
        console.log(err)
    }
}


