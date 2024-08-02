import mongoose from "mongoose"
import Farm from "../models/farm.model.js"

export const addFarm = async (req,res) => {
    try{
        const farm = new Farm({
            userId : new mongoose.Types.ObjectId(req.body.userId),
            location : req.body.location,
            farmSize : req.body.farmSize,
            cropName : req.body.cropName,
            sowingDate : req.body.sowingDate,
            city : req.body.city
        })

        await farm.save()

        if(!farm) {
            return res.status(400).json({
                message : "Add farm  Query Failed"
            })
        }
        res.status(200).json({
            message : "Farm has been successfully added",
            data : farm
        })

    }catch(err) {
        res.status(500).json({
            message : "Error occurs while adding Farm",
            error : err
        })
        console.log(err)
    }
}

export const getFarms = async (req,res) => {
    try{
        const farm = await Farm.find({userId  : req.params.id}).sort({createdAt : -1})

        if(!farm) {
            return res.status(400).json({
                message : "Get farm  Query Failed"
            })
        }
        res.status(200).json({
            message : "Farms has been successfully fetched",
            data : farm
        })

    }catch(err) {
        res.status(500).json({
            message : "Error occurs while fetching Farms",
            error : err
        })
        console.log(err)
    }
}

export const getUsersByFarmLocation = async (req,res) => {
    try{
        const farm = await Farm.find({location  : req.params.location})

        if(!farm) {
            return res.status(400).json({
                message : "Get farm  Query Failed"
            })
        }
        res.status(200).json({
            message : "Farms has been successfully fetched",
            data : farm
        })

    }catch(err) {
        res.status(500).json({
            message : "Error occurs while fetching Farms",
            error : err
        })
        console.log(err)
    }
}