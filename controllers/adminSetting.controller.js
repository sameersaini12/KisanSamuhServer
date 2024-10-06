import AdminSetting from "../models/adminSetting.model.js"

export const updateDeliveryCost = async (req,res) => {
    try {
        const adminSetting = new AdminSetting({
            deliveryCost : req.body.deliveryCost
        })

        await adminSetting.save()

        if(!adminSetting) {
            return res.status(400).json({
                message : "Add adminSetting  Query Failed"
            })
        }
        res.status(200).json({
            message : "AdminSetting has been successfully updated",
            data : adminSetting
        })
    }catch(err) {
        res.status(500).json({
            message : "Update Delivery Cost query Failed",
            error : err
        })
    }
}

export const getAdminSetting = async (req,res) => {
    try {
        const adminSetting = await AdminSetting.findById("67011d5d9e38861059f37324")

        if(!adminSetting) {
            return res.status(400).json({
                message : "Add adminSetting  Query Failed"
            })
        }
        res.status(200).json({
            message : "AdminSetting has been successfully updated",
            data : adminSetting
        })
    }catch(err) {
        res.status(500).json({
            message : "Get Admin Setting query Failed",
            error : err
        })
    }
}