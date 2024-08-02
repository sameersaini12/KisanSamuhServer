import express from "express"
const router = express.Router();
import authRoute from "./auth.route.js"
import userRoute from "./user.route.js"
import productRoute from "./product.route.js"
import orderRoute from "./order.route.js"
import feedbackRoute from "./feedback.route.js"
import farmRoute from "./farm.route.js"

router.use("/auth", authRoute)
router.use("/users", userRoute)
router.use("/product" , productRoute)
router.use("/order" , orderRoute)
router.use("/feedback" , feedbackRoute)
router.use("/farm" , farmRoute)

export default router