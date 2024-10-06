import express from "express"
const router = express.Router();
import authRoute from "./auth.route.js"
import userRoute from "./user.route.js"
import productRoute from "./product.route.js"
import orderRoute from "./order.route.js"
import feedbackRoute from "./feedback.route.js"
import farmRoute from "./farm.route.js"
import rewardRoute from "./reward.route.js"
import adminSettingRoute from "./adminSetting.route.js"

router.use("/auth", authRoute)
router.use("/users", userRoute)
router.use("/product" , productRoute)
router.use("/order" , orderRoute)
router.use("/feedback" , feedbackRoute)
router.use("/farm" , farmRoute)
router.use("/reward" , rewardRoute)
router.use("/admin-setting" , adminSettingRoute)

export default router