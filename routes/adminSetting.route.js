import express from "express"
import verifyToken, { verifyAdmin } from "../middleware/verifyToken.js"
import { getAdminSetting, updateDeliveryCost } from "../controllers/adminSetting.controller.js"
const router = express.Router()

router.post("/update-delivery-cost" , verifyAdmin, updateDeliveryCost)
router.get("/get-admin-setting" , verifyToken , getAdminSetting)

export default router