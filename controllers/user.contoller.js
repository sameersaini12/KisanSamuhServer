import Address from "../models/address.model.js"
import User from "../models/user.model.js"
import mongoose from "mongoose";

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set : (req.body)
            },
            {
                new : true
            }
        )
        if(!updatedUser) {
            return res.status(404).json({
                message : "User not Found!"
            })
        }
        res.status(200).json({
            message : "User has been updated successfully",
            data : updatedUser
        })
    }catch(err) {
        console.log(err)
        res.status(500).json({
            message : "User update Failed",
            error : err
        })
    }
}

export const getUserDetails = async (req,res) => {
    try {
        const user = await User.find({_id : req.params.id})
        if(!user) {
            return res.status(404).json({
                message : "User not Found!"
            })
        }
        res.status(200).json({
            message : "User has been fetched successfully",
            data : user
        })
    }catch(err) {
        console.log(err)
        res.status(500).json({
            message : "Get User Query Failed!",
            error : err
        })
    }
}

export const deletUser = async (req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message : "User has been deleted successfully"})
    }catch(err) {
        console.log(err)
        res.status(500).json({
            message : "User deletion Failed!",
            error : err
        })
    }
}

export const getAdmin = async (req,res) => {
    try {
        const admin = await User.findById(req.params.id)
        if(!admin) {
            return res.status(404).json({
                message : "User can't be find"
            })
        }
        const {password , ...info } = admin._doc
        res.status(200).json({
            message : "User has been found successfully",
            data : info
        })
    }catch(err) {
        res.status(500).json({
            message : "Get Admin query Failed",
            error : err
        })
        console.log(err)
    }
}

export const getAllUsers = async (req,res) => {
    try {
        const users = await User.find().sort({_id :-1})
        // const {password , ...info } = users._doc
        res.status(200).json({
            message : "Users has been found successfully",
            data : users
        })
    }catch(err) {
        res.status(500).json({
            message : "Get All Users query Failed",
            error : err
        })
        console.log(err)
    }
}

export const getUsersStats = async (req,res) => {
    try {
        const date = new Date()
        const lastYear = new Date(date.setFullYear(date.getFullYear()-1))

        const userStats  = await User.aggregate([
            {
                $match : {
                    createdAt : {
                        $gte : lastYear
                    }
                }
            },
            {
                $project : {
                    month : {
                        $month : "$createdAt"
                    }
                }
            },
            {
                $group : {
                    _id : "$month",
                    total : {
                        $sum : 1
                    }
                }
            }
        ])
        res.status(200).json({
            message : "User stats done successfully",
            data : userStats
        })
    }catch(err) {
        res.status(500).json({
            message : "User statistics query failed",
            error : err
        })
        console.log(err)
    }
}

export const addAddress = async (req , res ) => {
    try {
        const updatedAddress = await Address.findByIdAndUpdate(
            req.params.id,
            {
                $push : {
                    address : req.body
                },
                $set : {
                    userId :  new mongoose.Types.ObjectId(req.params.id)
                }
            },
            {
                upsert : true,
                new : true,
                setDefaultsOnInsert : true
            }
        )

        if(!updatedAddress) {
            return res.status(404).json({
                message : "Address not Found!"
            })
        }
        res.status(200).json({
            message : "Address has been added successfully",
            data : updatedAddress
        })
    }catch(err) {
        res.status(500).json({
            message : "Add Address query failed",
            error : err
        })
        console.log(err)
    }
}

export const getAddresss = async (req , res) => {
    try {
        const address = await Address.findById(req.params.id)

        if(!address) {
            return res.status(400).json({
                message : "There is no address available"
            })
        }
        res.status(200).json({
            message : "Address has been fetched succesully",
            data : address
        })
    }catch(err) {
        res.status(500).json({
            message : "Get Address query failed",
            error : err
        })
        console.log(err)
    }
}

export const deleteAddress = async (req,res) => {
    try {
        const addressIndex = req.body.index
        await Address.findByIdAndUpdate(req.params.id,
            {
                $unset : { [`address.${addressIndex}`] : 1 }
            }
        )
        const addressAfterDelete = await Address.findByIdAndUpdate(req.params.id,
            {
                $pull : { "address" : null}
            },
            {
                new : true
            }
        )
        if(!addressAfterDelete) {
            return res.status(400).json({
                message : "There is no address available"
            })
        }
        res.status(200).json({
            message : "Address has been deleted succesully",
            data : addressAfterDelete
        })
    }catch (err) {
        res.status(500).json({
            message : "Delete Address query failed",
            error : err
        })
        console.log(err)
    }
}

export const updateRewardCoins = async (req,res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $inc : {
                    coins : req.body.coins
                }
            },
            {
                new : true
            }
        )
        if(!updatedUser) {
            return res.status(404).json({
                message : "User not Found!"
            })
        }
        res.status(200).json({
            message : "User has been updated successfully",
            data : updatedUser
        })
    }catch (err) {
        res.status(500).json({
            message : "Update Reward Coins query failed",
            error : err
        })
        console.log(err)
    }
}


// export const getRewardCoins = async (req,res) => {
//     try {
//         const user = await User.find({_id : req.params.id})
//         if(!user) {
//             return res.status(404).json({
//                 message : "User not Found!"
//             })
//         }
//         res.status(200).json({
//             message : "User has been fetched successfully",
//             data : user.coins
//         })
//     }catch (err) {
//         res.status(500).json({
//             message : "Update Reward Coins query failed",
//             error : err
//         })
//         console.log(err)
//     }
// }