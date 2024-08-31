import express from "express"
import { addReward, getAllAdminRedeemOrders, getAllUserRedeemOrders, getRewardsList, redeemReward, updateRedeemReward } from "../controllers/reward.controller.js";
import verifyToken, { verifyAdmin } from "../middleware/verifyToken.js";
const router = express.Router()

router.post("/add-reward" , addReward)
router.get("/get-rewards" , getRewardsList)
router.post("/redeem-reward" , verifyToken , redeemReward)
router.get("/get-user-redeem-orders/:id" , verifyToken , getAllUserRedeemOrders)
router.get("/get-admin-redeem-orders" , verifyAdmin , getAllAdminRedeemOrders)
router.post("/update-redeem-reward/:id" , verifyAdmin , updateRedeemReward)

export default router;