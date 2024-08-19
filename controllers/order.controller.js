import mongoose from "mongoose";
import Order from "../models/order.model.js"

export const addToOrderHistory = async (req,res) => {
    try {
        const currentDate = new Date();

        const OrderedProduct = new Order({
            userId : new mongoose.Types.ObjectId(req.body.userId),
            orders :req.body.orders,
            amount : req.body.amount,
            address : req.body.address,
            orderDate : req.body.orderDate,
            paymentStatus : req.body.paymentStatus,
            paymentMode : req.body.paymentMode,
            buyingGroup : req.body.buyingGroup,
            deliveryDate : req.body.deliveryDate,
            rewardCoins : req.body.rewardCoins,
        })

        await OrderedProduct.save()

        if(!OrderedProduct) {
            return res.status(400).json({
                message : "Add to History Query Failed"
            })
        }
        res.status(200).json({
            message : "Item has been successfully added to Order History",
            data : OrderedProduct
        })
    }catch(err) {
        res.status(500).json({
            message : "Error occurs while adding order to History List",
            error : err
        })
        console.log(err)
    }
}

export const getAllOrdersAdmin = async (req,res) => {
    try {
        const orders = await Order.find().sort({createdAt : -1})

        if(!orders) {
            return res.status(400).json({
                message : "Fetching All Orders Query Failed"
            })
        }
        res.status(200).json({
            message : "Orders has been successfully fetched",
            data : orders
        })
    }catch(err) {
        res.status(500).json({
            message : "Error occurs while fetching orders",
            error : err
        })
        console.log(err)
    }
}

export const updateOrder = async (req,res) => {
    try {
        const orders = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set : req.body
            },
            {
                new  :true
            }
        )

        if(!orders) {
            return res.status(400).json({
                message : "Updation Order Query Failed"
            })
        }
        res.status(200).json({
            message : "Order has been successfully updated",
            data : orders
        })
    }catch(err) {
        res.status(500).json({
            message : "Error occurs while updation order",
            error : err
        })
        console.log(err)
    }
}

export const getAllActiveOrders = async (req,res) => {
    try {
        const orders = await Order.find({userId : req.params.id , status : { $ne : "delivered"}}).sort({updatedAt : -1})

        if(!orders) {
            return res.status(400).json({
                message : "Fetching Orders Query Failed"
            })
        }
        res.status(200).json({
            message : "Orders has been successfully fetched",
            data : orders
        })
    }catch(err) {
        res.status(500).json({
            message : "Error occurs while fetching orders",
            error : err
        })
        console.log(err)
    }
}


export const getAllOrders = async (req,res) => {
    try {
        const orders = await Order.find({userId : req.params.id, status : "delivered"}).sort({updatedAt : -1})

        if(!orders) {
            return res.status(400).json({
                message : "Fetching Orders Query Failed"
            })
        }
        res.status(200).json({
            message : "Orders has been successfully fetched",
            data : orders
        })
    }catch(err) {
        res.status(500).json({
            message : "Error occurs while fetching orders",
            error : err
        })
        console.log(err)
    }
}

export const getCurrentGroupOrder = async (req,res) => {
    try {
        const orders = await Order.aggregate([
            {
                $match : {
                    buyingGroup : req.params.groupName,
                    status : {
                        $ne : "delivered"
                    }
                },
            },
            {
                $group : {
                    _id :  "$deliveryDate",
                    orders : {
                        $push : "$$ROOT"
                    }
                }
            },
            {
                $addFields : {
                    totalGroupOrderAmount : { $sum : "$orders.amount"}
                }
            },
            {
                $sort : {
                    "_id" : 1
                }
            }
        ])

        if(!orders) {
            return res.status(400).json({
                message : "Fetching Orders Query Failed"
            })
        }
        res.status(200).json({
            message : "Orders has been successfully fetched",
            data : orders
        })
    }catch(err) {
        res.status(500).json({
            message : "Error occurs while fetching orders",
            error : err
        })
        console.log(err)
    }
}

export const getPreviousGroupOrder = async (req,res) => {
    try {
        const pageNumber = Number(req.params.pageNumber)
        const pageSize = Number(req.params.pageSize)
        const orders = await Order.aggregate([
            {
                $match : {
                    buyingGroup : req.params.groupName,
                    status : "delivered"
                },
            },
            {
                $group : {
                    _id : "$deliveryDate",
                    orders : {
                        $push : "$$ROOT"
                    }
                }
            },
            {
                $addFields : {
                    totalGroupOrderAmount : { $sum : "$orders.amount"}
                }
            },
            {
                $sort : {
                    "_id" : -1
                }
            },
            {
                $skip : (pageNumber)*pageSize
            },
            {
                $limit : pageSize
            }
        ])

        if(!orders) {
            return res.status(400).json({
                message : "Fetching Orders Query Failed"
            })
        }
        res.status(200).json({
            message : "Orders has been successfully fetched",
            data : orders
        })
    }catch(err) {
        res.status(500).json({
            message : "Error occurs while fetching orders",
            error : err
        })
        console.log(err)
    }
}

export const getCoinRewardHistory = async (req,res) => {
    try {
        const orders = await Order.find({userId : req.params.id, status : "delivered", rewardCoins : { $gt : 0}}).sort({updatedAt : -1})

        if(!orders) {
            return res.status(400).json({
                message : "Fetching Coin history Query Failed"
            })
        }
        res.status(200).json({
            message : "Coin History has been successfully fetched",
            data : orders
        })
    }catch {
        res.status(500).json({
            message : "Error occurs while fetching coin history",
            error : err
        })
        console.log(err)
    }
}
